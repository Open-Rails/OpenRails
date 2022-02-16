import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';


const HomePage: React.FC = () => {

 return <div>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px', background: 'blue', width: 340, height: 144 }}>
      <WalletMultiButton />
    </div>
  </div>
}

export default HomePage; 
