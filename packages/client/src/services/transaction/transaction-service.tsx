/* eslint-disable @typescript-eslint/no-var-requires */
import { useState } from 'react'

import { useWallet } from '@solana/wallet-adapter-react';
import { Commitment, Connection, LAMPORTS_PER_SOL, sendAndConfirmTransaction } from '@solana/web3.js';
import w3Connector from '../../lib/solana-w3/w3-connector'
import payWalletConnector from '../../lib/solana-pay/wallet-connector'
import { ICreateTransactionUrl, IMakeTransaction } from './transaction-types';

export const useTransactionService = () => {
  const createTransactionUrl = (params: ICreateTransactionUrl) => {
    const {
      recipient,
      amount,
      label,
      message,
      memo,
      reference
    } = params;

    return `solana:${recipient}?amount=${amount}&label=${label}&message=${message}&memo=${memo}&reference=${reference}`
  }

  const makeTransaction = async (params: IMakeTransaction) => {

    const { checkout, customerWallet } = params;

    try {

      const connection = await w3Connector.establishConnection();

      const transactionUrl = createTransactionUrl(checkout)

      const transaction = await payWalletConnector.setTransaction({
        connection, 
        customerPublicKey: customerWallet.publicKey,
        transactionUrl
      })

      sendAndConfirmTransaction(connection, transaction, [customerWallet]);
    } catch (error) {
      throw error
    }
  }


  return {
    createTransactionUrl,
    makeTransaction
  }

}