import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  sendAndConfirmRawTransaction,
  TransactionInstruction
} from '@solana/web3.js'
import React, { FC, useCallback } from 'react'

type TransactionStatus =
  | 'none'
  | 'waiting for sig'
  | 'sending...'
  | 'confirming...'
  | 'complete'
  | 'failed'

// Record of transaction times on mainnet, by confirmation level:
// 'processed': 4.9s / 4s
// 'confirmed': 6.8s / 4.3s / 5.5s / 4.2s
// 'finalized': 23.4s / 23.4s

const SendButton: FC<{ amountSol: number; recipient: string }> = ({ amountSol, recipient }) => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction, wallet, signTransaction } = useWallet()
  const [transactionStatus, setTransactionStatus] = React.useState<TransactionStatus>('none')

  const transactionStandard = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError()

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(recipient),
        lamports: amountSol * LAMPORTS_PER_SOL
      })
    )

    setTransactionStatus('waiting for sig')

    sendTransaction(transaction, connection)
      .then(txHash => {
        console.log('txHash: ', txHash)

        setTransactionStatus('sending...')
        connection
          .confirmTransaction(txHash)
          // RpcResponseAndContext<SignatureResult>
          .then(signatureResult => {
            setTransactionStatus('complete')
          })
          .catch(err => {
            setTransactionStatus('failed')
          })
      })
      .catch(err => {
        setTransactionStatus('failed')
      })

    // const signature = await sendTransaction(transaction, connection)
    // await connection.confirmTransaction(signature, 'processed')
  }, [publicKey, sendTransaction, connection, recipient, amountSol])

  const transactionDeprecated = React.useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError()
    if (!signTransaction) {
      console.log('signTransaction method does not exist')
      return
    }

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(recipient),
        lamports: amountSol * LAMPORTS_PER_SOL
      })
    )

    transaction.add(
      new TransactionInstruction({
        keys: [{ pubkey: publicKey, isSigner: true, isWritable: true }],
        data: Buffer.from('This is some custom memo data Paul wrote here, thanks', 'utf-8'),
        programId: new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr')
      })
    )

    // this is switching to .getLatestBlockhash soon in v1.9
    const recentBlockhash = await connection.getRecentBlockhash()
    transaction.recentBlockhash = recentBlockhash.blockhash
    transaction.feePayer = publicKey

    // this is the cost of a transaction fee, based on the number of signatures
    const cost = recentBlockhash.feeCalculator.lamportsPerSignature

    /*
    { feePayer: publicKey,
    instructions: [],
    nonceInfo: ???, <- what is this
    recentBlockhash: string, like 5JfUuaZc7njgs5Mx67aP48fUqfzb1zGkp3vchukAVTs5
    signatures: []
    }

    note that block hashes expire after 150 blocks, which is about 1 minute

    Note that there should also be an 'accounts' array in the transaction, but there is not
    instructions are supposed to contain an 'accounts' array as well--I'm guessing that's what 'keys' is

    Each instruction has: { data: Unit8Array(12), keys: [ { pubkey: pubKey, isSigner: boolean, isExecutable: boolean}], programId: publicKey,  }

    Each signature has {publicKey: publicKey, signature: Uint8Array(64)}

    txHash: string

    txResult consists of:
    txResult.context.slot = block height
    txResult.value.err = null (if everything went well)


    When the transaction is serialized, it turns into a Unit8Array(215)
    */

    setTransactionStatus('waiting for sig')

    console.log('pre-signed signatures verified: ', transaction.verifySignatures())
    console.log('before signing tx: ', transaction)

    // RpcResponseAndContext<SignatureResult>
    signTransaction(transaction)
      .then(async signedTx => {
        console.log('signed tx: ', signedTx)
        console.log('signed signatures verified: ', signedTx.verifySignatures())

        setTransactionStatus('sending...')

        const serialized = signedTx.serialize()
        console.log('serialized tx', serialized)

        // const txHash = await connection.sendRawTransaction(signedTx.serialize())

        setTransactionStatus('confirming...')

        // connection
        //   .confirmTransaction(txHash)
        //   .then(txResult => {
        //     setTransactionStatus('complete')
        //   })
        //   .catch(err => {
        //     setTransactionStatus('failed')
        //   })
      })
      .catch(err => {
        setTransactionStatus('failed')
      })
  }, [publicKey, signTransaction, connection, recipient, amountSol])

  return (
    <div>
      <p>{`Your PublicKey: ${publicKey?.toBase58()}`}</p>
      <p>{`Wallet State: ${wallet?.readyState.valueOf()}`}</p>
      <p>
        <button onClick={transactionDeprecated} disabled={!publicKey}>
          {`Send ${amountSol} SOL to ${recipient}`}
        </button>
      </p>
      <p>{`Transaction status: ${transactionStatus}`}</p>
    </div>
  )
}

export default SendButton
