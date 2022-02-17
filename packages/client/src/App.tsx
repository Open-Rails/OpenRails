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
import { lightTheme } from './assets/theme/mui-theme';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme(lightTheme)
const App: React.FC = () => {
  return (
    <div className="app-container">
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </div >
  );
};

export default App
