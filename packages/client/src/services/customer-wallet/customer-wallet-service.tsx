import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export const useCustomerWalletService = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
    getBalance()
  }, [wallet]);

  const getPublicKey58 = () => {
    return wallet.publicKey.toBase58()
  }

  const getBalance = async () => {
    const account = await connection.getAccountInfo(wallet.publicKey)
    console.log(account)
    const newBalance = account.lamports
    setBalance(newBalance)
    return newBalance
  }

  return  {
    ...wallet,
    getPublicKey58,
    getBalance,
    balance
  }
}

