import { Adapter } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import React from 'react'

interface LayoutWallet {
  children: any; 
  network: string; 
  wallets: Adapter[]
}

const LayoutWallet: React.FC<LayoutWallet> = (props: LayoutWallet) => {
  const { network, wallets } = props;

  return <ConnectionProvider endpoint={network}>
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
       {props.children}
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
}

export default LayoutWallet