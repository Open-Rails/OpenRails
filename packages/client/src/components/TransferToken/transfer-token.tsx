import React from 'react'
import {
  //   getOrCreateAssociatedTokenAccount,
  createInitializeAccountInstruction,
  TOKEN_PROGRAM_ID,
  createTransferCheckedInstruction
} from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Transaction, PublicKey } from '@solana/web3.js'

// Constants

const nativeUSDC = {
  mint: new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
  decimals: 6
}

const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(
  'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
)

// Utils

const findAssociatedTokenAddress = async (
  walletAddress: PublicKey,
  tokenMintAddress: PublicKey
): Promise<PublicKey> => {
  return (
    await PublicKey.findProgramAddress(
      [walletAddress.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
  )[0]
}

// Component

const TransferTokenButton: React.FC<{ recipientPubkey: PublicKey; amount: number }> = ({
  recipientPubkey,
  amount
}) => {
  const { connection } = useConnection()
  const { publicKey: senderPubkey, sendTransaction } = useWallet()

  const onClick = React.useCallback(async () => {
    if (!senderPubkey) return
    if (amount < 0) return
    // transfer amounts are specificed as a bigint, not a float
    const intAmount = BigInt(Math.floor(amount * Math.pow(10, nativeUSDC.decimals)))

    const senderTokenAccount = await findAssociatedTokenAddress(senderPubkey, nativeUSDC.mint)
    const recipientTokenAccount = await findAssociatedTokenAddress(recipientPubkey, nativeUSDC.mint)

    // TODO: I still need to figue out how to check if a token account exists for the recipient, and create it
    // if it doesn't

    // This method gets or creates an associated token account, but it requires the private key for the wallet object
    // const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, wallet, nativeUSDC.mint, recipientPubkey);

    // const createInstruction = createInitializeAccountInstruction(
    //   recipientTokenAccount,
    //   nativeUSDC.mint,
    //   recipientPubkey,
    //   TOKEN_PROGRAM_ID
    // )

    // This instruction will fail if either the sender or recipient token accounts have not yet been created
    const transferInstruction = createTransferCheckedInstruction(
      senderTokenAccount,
      nativeUSDC.mint,
      recipientTokenAccount,
      senderPubkey,
      intAmount,
      nativeUSDC.decimals
    )

    const transaction = new Transaction().add(transferInstruction)

    try {
      const txHash = await sendTransaction(transaction, connection)
      const signatureResult = await connection.confirmTransaction(txHash)
      console.log('transaction complete', signatureResult)
    } catch (err) {
      console.warn(err)
    }
  }, [connection, amount, recipientPubkey, sendTransaction, senderPubkey])

  return <button onClick={onClick}>{`Send ${amount} USDC`}</button>
}

export default TransferTokenButton
