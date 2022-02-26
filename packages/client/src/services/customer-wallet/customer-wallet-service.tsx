import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import w3Connector from '../../lib/solana-w3/w3-connector'

export const useCustomerWalletService = () => {
  const { connection } = useConnection()
  const wallet = useWallet()
  const [balance, setBalance] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState<string>('')

  useEffect(() => {
    if (wallet.publicKey) {
      getBalance()
    }
  }, [wallet])

  const getPublicKey58 = () => {
    try {
      return wallet.publicKey?.toBase58()
    } catch (error) {
      console.log(error)
      setErrorMessage('Your wallet is not connected')
    }
  }

  const getBalance = async () => {
    try {
      if (!wallet.publicKey) throw new Error()
      const account = await connection.getAccountInfo(wallet.publicKey)

      if (!account) throw new Error()
      const newBalance = account.lamports / LAMPORTS_PER_SOL

      setBalance(newBalance)
      return newBalance
    } catch (error) {
      setErrorMessage('Your wallet is not connected')
    }
  }

  const createTransaction = async (amount: number) => {
    //This is a demo
    const toPublicKey = Keypair.generate().publicKey
    const lamports = LAMPORTS_PER_SOL * amount
    try {
      if (!wallet.publicKey) throw new Error()

      const transaction: Transaction = w3Connector.makeTransaction({
        fromPublicKey: wallet.publicKey,
        toPublicKey: toPublicKey,
        lamports
      })

      console.log('transaction', transaction)
      const signature = await wallet.sendTransaction(transaction, connection)

      console.log('signature', signature)
      await connection.confirmTransaction(signature, 'processed')

      const newBalance = balance - amount
      setBalance(newBalance)
    } catch (error) {
      console.log('transactionnnn', error)

      if (wallet.publicKey) {
        setErrorMessage('Error Making the transaction')
      } else {
        setErrorMessage('Your wallet is not connected')
      }
    }
  }

  return {
    ...wallet,
    getPublicKey58,
    getBalance,
    balance,
    createTransaction,
    errorMessage,
    setErrorMessage
  }
}
