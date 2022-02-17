import React, { useEffect, useState } from 'react'
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useCustomerWalletService } from '../../services/customer-wallet/customer-wallet-service';
import MainLayout from '../../components/layouts/main-layout/main-layout';
import { Paper, Typography } from '@mui/material';
import CardBalance from '../../components/cards/card-balance/card-balance';
import HomeContainer from './home-style';
require('@solana/wallet-adapter-react-ui/styles.css');

const HomePage: React.FC = () => {
  const walletService = useCustomerWalletService()

 return <HomeContainer>
   <MainLayout hasHeader>
     <Typography 
      variant="h3"
      className="home-title"
     >
       <h1>Welcome User!</h1>
     </Typography>
    <section>
      <article className="card-balance">
         <CardBalance
           title={{
             text: 'Wallet balance',
             tag: 'h2'
           }}
           balance={walletService.balance}
           currency="SOL"
         />
      </article>
     
    </section>
    
   </MainLayout>

  </HomeContainer>
}

export default HomePage; 
