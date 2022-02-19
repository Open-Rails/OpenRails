import React, { useEffect, useState } from 'react'
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useCustomerWalletService } from '../../services/customer-wallet/customer-wallet-service';
import MainLayout from '../../components/layouts/main-layout/main-layout';
import { Button, Paper, TextField, Typography } from '@mui/material';
import CardBalance from '../../components/cards/card-balance/card-balance';
import HomeContainer from './home-style';
import ModalInfo from '../../components/modal-info/modal-info';
require('@solana/wallet-adapter-react-ui/styles.css');

const HomePage: React.FC = () => {
  const walletService = useCustomerWalletService()
  const [amountToSend, setAmountToSend] = useState<number>(0)

  return <HomeContainer>
    <MainLayout hasHeader>
      <Typography
        variant="h3"
        className="home-title"
        component="div"
      >
        <h1>Welcome User!</h1>
      </Typography>
      <section className="home-section">
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

        <article className="transaction-article">
          <Paper className="transaction-paper">
            <Typography
              variant="h5"
              component="div"
              className="transaction-title">
              <h2>Make a transaction</h2>
            </Typography>

            <form
              id="transaction-form"
              className="transaction-form"
              
            >
              <div className="transaction-field">
                <TextField
                  label="SOL Amount"
                  variant="standard"
                  type="number"
                  onBlur={(event) => setAmountToSend(Number(event.target.value))}
                />
              </div>

              <Button
                variant="contained"
                color="secondary"
                className="transaction-button"
                onClick={(event) => {
                  event.preventDefault()
                  walletService.createTransaction(amountToSend)
                }}
              >
                Send SOL
              </Button>
            </form>
          </Paper>
        </article>

        <ModalInfo
          open={walletService.errorMessage ? true : false}
          onClose={() => walletService.setErrorMessage('')}
          title={{
            tag: 'h2',
            text: "Error"
            }
          }
          message={walletService.errorMessage}
        />

      </section>

    </MainLayout>

  </HomeContainer>
}

export default HomePage; 
