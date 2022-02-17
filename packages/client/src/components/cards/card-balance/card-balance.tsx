import { Paper, Typography } from '@mui/material';
import React from 'react'
import HeadingElement, { THeadings } from '../../text/heading-element/heading-element';
import CardBalanceContainer from './card-balance-style'

interface CardBalanceProps {
  title: {
    text: string; 
    tag: THeadings
  }; 
  balance: number; 
  currency?: string;  
}
const CardBalance: React.FC<CardBalanceProps> = (props: CardBalanceProps) => {
  const { balance, currency, title} = props; 
  return <CardBalanceContainer>
    <Paper className="card-balance-paper">
      <Typography
        variant="h5"
        component="div"
        className="card-balance-title"
      >
        <HeadingElement
          heading={title.tag}
          text={title.text}
        />
      </Typography>

      <Typography
        variant="h3"
        component="div"
        className="card-balance-balance"
      >
        <p>{balance} {currency}</p>
      </Typography>
    </Paper>
    
  </CardBalanceContainer>
}

export default CardBalance; 