//An array with the wallet adapters we are going to use

import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";

export const WALLETS = [
  new PhantomWalletAdapter()
]