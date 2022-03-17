import React, { useEffect } from 'react'
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
import { approveChecked, createApproveCheckedInstruction, transfer } from '@solana/spl-token'

const AuthorizeButton: React.FC = () => {
  const { connection } = useConnection()

  // useEffect(() => {
  //   const whatever = async () => {
  //     const pubkey = new PublicKey('9AXtisAFD8jc48cghcLXNH9H1gCgqGwa7N2P4hyVfdiS')

  //     const accounts = await connection.getTokenAccountsByOwner({ pubkey })
  //   }

  //   whatever()
  // }, [])]

  // const onClick = React.useEffect(() => {
  //       // 1) use build-in function
  // {
  //   let txhash = await approveChecked(
  //     connection, // connection
  //     feePayer, // fee payer
  //     mintPubkey, // mint
  //     tokenAccountPubkey, // token account
  //     randomGuy.publicKey, // delegate
  //     alice, // owner of token account
  //     1e8, // amount, if your deciamls is 8, 10^8 for 1 token
  //     8 // decimals
  //   );
  //   console.log(`txhash: ${txhash}`);
  // }
  // // or

  // // 2) compose by yourself
  // {
  //   let tx = new Transaction().add(
  //     createApproveCheckedInstruction(
  //       tokenAccountPubkey, // token account
  //       mintPubkey, // mint
  //       randomGuy.publicKey, // delegate
  //       alice.publicKey, // owner of token account
  //       1e8, // amount, if your deciamls is 8, 10^8 for 1 token
  //       8 // decimals
  //     )
  //   );
  //   console.log(`txhash: ${await connection.sendTransaction(tx, [feePayer, alice /* fee payer + owner */])}`);
  // }
  // }, [])

  // const instruction = new Instruction()

  // const transaction = new Transaction().add(

  //   SystemProgram.{
  //     fromPubkey: publicKey,
  //     toPubkey: new PublicKey(recipient),
  //     lamports: amountSol * LAMPORTS_PER_SOL
  //   })
  // )

  return <></>
}

export default AuthorizeButton
