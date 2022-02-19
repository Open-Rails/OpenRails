import { Cluster, clusterApiUrl, Connection, Transaction, SystemProgram, sendAndConfirmTransaction } from '@solana/web3.js';
import { ISendTransaction } from './w3-connector-types';

const connectToCluster = async (cluster: Cluster = "devnet"): Promise<Connection> => {
  const endpoint = clusterApiUrl(cluster);
  const connection = new Connection(endpoint, 'confirmed');
  return connection;
}

const makeTransaction = (params: ISendTransaction): Transaction => {
  const {
    fromPublicKey,
    toPublicKey,
    lamports,
    
  } = params; 

  let transaction = new Transaction();

  transaction.add(
    SystemProgram.transfer({
      fromPubkey: fromPublicKey,
      toPubkey: toPublicKey,
      lamports: lamports
    })
  );

  return transaction;
}


export default {
  connectToCluster,
  makeTransaction
}

