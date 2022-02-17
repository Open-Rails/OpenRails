import { Cluster, clusterApiUrl, Connection } from '@solana/web3.js';


const connectToCluster = async (cluster: Cluster = "devnet"): Promise<Connection> => {
  const endpoint = clusterApiUrl(cluster);
  const connection = new Connection(endpoint, 'confirmed');
  return connection;
}

export default {
  connectToCluster
}

