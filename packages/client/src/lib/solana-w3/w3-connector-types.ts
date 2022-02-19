import { Connection, PublicKey, Signer, Transaction } from "@solana/web3.js";

export interface ISendTransaction {
  fromPublicKey: PublicKey;
  toPublicKey: PublicKey;
  lamports: number;
}

