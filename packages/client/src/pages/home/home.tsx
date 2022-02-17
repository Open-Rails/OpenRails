import React, { useEffect } from 'react'
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useCustomerWalletService } from '../../services/customer-wallet/customer-wallet-service';
import MainLayout from '../../components/layouts/main-layout/main-layout';
require('@solana/wallet-adapter-react-ui/styles.css');



const HomePage: React.FC = () => {
  const walletService = useCustomerWalletService()

 return <div>
   <MainLayout hasHeader>
    
   </MainLayout>

  </div>
}

export default HomePage; 
