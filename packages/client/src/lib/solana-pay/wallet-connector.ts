import { parseURL, createTransaction } from '@solana/pay';
import { Connection } from '@solana/web3.js';
import BigNumber from 'bignumber.js';

// TODO: add type customerPublicKey
interface ICreateTransaction {
  connection: Connection;
  customerPublicKey: any;
  transactionUrl: string;
}

const setTransaction = async (params: ICreateTransaction) => {
  const { connection, customerPublicKey, transactionUrl } = params;

  const { recipient, memo, amount, reference } = parseURL(transactionUrl);

  const transaction = await createTransaction(connection, customerPublicKey, recipient, amount as BigNumber, {
    reference,
    memo,
  });

  return transaction
}

export default {
  setTransaction
}

