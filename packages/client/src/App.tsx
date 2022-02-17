import React from 'react';
import logo from './logo.svg';
import './App.css';
import LayoutWallet from './components/layouts/layout-wallet';
import { WALLETS } from './constants/wallets';
import { NETWORK } from './constants/network';
import HomePage from './pages/home/home';
import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <LayoutWallet
        wallets={WALLETS}
        network={NETWORK}
      >
        <HashRouter>
            <Routes>
              <Route path='/' element={<HomePage />} />
            </Routes>
        </HashRouter>
      </LayoutWallet>
    </div >
  );
};

export default App
