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

const fireFoxWallet = "GCQLiawuDQbaaxFUAKcGpvQxfSxddZwGDp8p4Q57DfoX";
const mobileWallet = "8LfpJdYTjKU9ZdBZUErzMydRqGNrihKn2qvjwtBfYK2r";

function App() {
  return (
    <Container>
      <CssBaseline/>
      <Wallet>
        <ChatContextProvider>
        <PeerConnectionContextProvider>
          <PeerConnection />
        </PeerConnectionContextProvider>
        </ChatContextProvider>
        <MerchantURL />
        <Balances />
        <SendButton recipient={mobileWallet} amountSol={0.05} />
        <SignButton />
        <TransferTokenButton
          recipientPubkey={new PublicKey(fireFoxWallet)}
          amount={0.05}
        />
      </Wallet>
    </Container>
  );
}

export default App;
