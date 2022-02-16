import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js'
import React, { FC, useCallback } from 'react'

const SendButton: FC = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError()

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey('GCQLiawuDQbaaxFUAKcGpvQxfSxddZwGDp8p4Q57DfoX'),
        // toPubkey: Keypair.generate().publicKey,
        lamports: 0.1 * LAMPORTS_PER_SOL
      })
    )

    const signature = await sendTransaction(transaction, connection)

    await connection.confirmTransaction(signature, 'processed')
  }, [publicKey, sendTransaction, connection])

  return (
    <button onClick={onClick} disabled={!publicKey}>
      Send 0.1 SOL
    </button>
  )
}

export default SendButton
