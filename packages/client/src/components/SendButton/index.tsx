import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js'
import React, { FC, useCallback } from 'react'

type TransactionStatus = 'none' | 'waiting for sig' | 'sending...' | 'complete' | 'failed'

// Record of transaction times on mainnet, by confirmation level:
// 'processed': 4.9s / 4s
// 'confirmed': 6.8s / 4.3s / 5.5s / 4.2s
// 'finalized': 23.4s / 23.4s

const SendButton: FC<{ amountSol: number; recipient: string }> = ({ amountSol, recipient }) => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction, wallet } = useWallet()
  const [transactionStatus, setTransactionStatus] = React.useState<TransactionStatus>('none')

  const onClick = useCallback(async () => {
    if (!publicKey) throw new WalletNotConnectedError()

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(recipient),
        lamports: amountSol * LAMPORTS_PER_SOL
      })
    )

    setTransactionStatus('waiting for sig')

    // RpcResponseAndContext<SignatureResult>
    sendTransaction(transaction, connection)
      .then(signature => {
        setTransactionStatus('sending...')
        connection
          .confirmTransaction(signature)
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

  return (
    <div>
      <p>{`User PublicKey: ${publicKey?.toBase58()}`}</p>
      <p>{`Wallet State: ${wallet?.readyState.valueOf()}`}</p>
      <p>
        <button onClick={onClick} disabled={!publicKey}>
          {`Send ${amountSol} SOL to ${recipient}`}
        </button>
      </p>
      <p>{`Transaction status: ${transactionStatus}`}</p>
    </div>
  )
}

export default SendButton
