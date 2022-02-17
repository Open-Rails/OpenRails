import React, { useEffect } from 'react'
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useCustomerWalletService } from '../../services/customer-wallet/customer-wallet-service';
require('@solana/wallet-adapter-react-ui/styles.css');



const HomePage: React.FC = () => {
  const walletService = useCustomerWalletService()

 return <div>
  <WalletMultiButton />
    

  <WalletDisconnectButton />

  </div>
}

export default HomePage; 
