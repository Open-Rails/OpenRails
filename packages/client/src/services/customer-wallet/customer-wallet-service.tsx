import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";

export const useCustomerWalletService = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const getPublicKey58 = () => {
    return wallet.publicKey.toBase58()
  }

  const getBalance = async () => {
    const account = await connection.getAccountInfo(wallet.publicKey)
    console.log(account)
    return account.lamports
  }

  return  {
    ...wallet,
    getPublicKey58,
    getBalance
  }
}

