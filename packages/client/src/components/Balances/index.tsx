import { jsxExpressionContainer } from '@babel/types'
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js'
import React, { FC, useCallback, useEffect } from 'react'
import { connect } from 'tls'
import { getEnvironmentData } from 'worker_threads'

const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')

const Balances: FC = () => {
  const { connection } = useConnection()
  const { publicKey, sendTransaction, wallet } = useWallet()
  const [SOLBalance, setSOLBalance] = React.useState<number>()

  useEffect(() => {
    const getData = async () => {
      if (publicKey) {
        const accountInfo = await connection.getParsedAccountInfo(publicKey)

        const lamports = accountInfo.value?.lamports

        if (lamports) setSOLBalance(lamports / LAMPORTS_PER_SOL)
      }
    }
    getData()
  }, [connection, publicKey])

  useEffect(() => {
    const getData = async () => {
      if (publicKey) {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
          programId: TOKEN_PROGRAM_ID
        })

        fetch(
          'https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/src/tokens/solana.tokenlist.json'
        )
          .then(res => res.json())
          .then(result => {
            console.log(result)
          })

        tokenAccounts.value.forEach(tokenAccount => {
          // console.log('Account Pubkey: ', tokenAccount.pubkey.toBase58())
          // console.log('Token mint: ', tokenAccount.account.data.parsed.info.mint)
          // console.log('Account Owner: ', tokenAccount.account.data.parsed.info.owner)
          // console.log('Token Amount: ', tokenAccount.account.data.parsed.info.tokenAmount.amount)
          // console.log('Account Data: ', tokenAccount.account.data)
        })
      }
    }
    getData()
  }, [connection, publicKey])

  return <p>{`Your SOL Balance: ${SOLBalance}`}</p>
}

export default Balances
