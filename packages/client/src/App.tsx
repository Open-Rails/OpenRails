import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Wallet from "./components/Wallet";
import SendButton from "./components/SendButton";
import Balances from "./components/Balances";
import TransferTokenButton from "./components/TransferToken/transfer-token";
import { PublicKey } from "@solana/web3.js";
import SignButton from "./components/SignButton";
import MerchantURL from "./components/MerchantURL";
import PeerConnection from "./components/PeerConnection";
import { PeerConnectionContextProvider } from "./hooks/usePeerConnection";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ChatContextProvider } from "./hooks/useChat";
import PhandomDLPlayground from "./phantom-dl-method-wrapper/PhantomDLPlayground/index";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import AppRouting from "./routing";
import Stack from "@mui/material/Stack";
const fireFoxWallet = "GCQLiawuDQbaaxFUAKcGpvQxfSxddZwGDp8p4Q57DfoX";
const mobileWallet = "8LfpJdYTjKU9ZdBZUErzMydRqGNrihKn2qvjwtBfYK2r";

function App() {
  return (
    <Container>
      <CssBaseline />

      <Stack>
        <NavLink to={AppRouting.Home}>Home</NavLink>
        <NavLink to={AppRouting.Index}>Index</NavLink>
        <NavLink to={AppRouting.ProviderInjection}>Provider Injection</NavLink>
        <NavLink to={AppRouting.Chat}>Chat</NavLink>
      </Stack>

      <Route exact path={AppRouting.Home}>
        <h1>You are at home</h1>
      </Route>
      <Route exact path={AppRouting.Index}>
        <h1>You are at index</h1>
      </Route>

      <Route path={AppRouting.ProviderInjection}>
        <h1>You are testing Provider Injection</h1>

        <Wallet>
          <MerchantURL />
          <Balances />
          <SendButton recipient={mobileWallet} amountSol={0.05} />
          <SignButton />
          <TransferTokenButton
            recipientPubkey={new PublicKey(fireFoxWallet)}
            amount={0.05}
          />
        </Wallet>
      </Route>

      <Route path={AppRouting.Chat}>
        <h1>You are testing the Chat</h1>

        <ChatContextProvider>
          <PeerConnectionContextProvider>
            <PeerConnection />
          </PeerConnectionContextProvider>
        </ChatContextProvider>
      </Route>

      <PhandomDLPlayground />
    </Container>
  );
}

export default App;
