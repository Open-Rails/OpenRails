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

const fireFoxWallet = "GCQLiawuDQbaaxFUAKcGpvQxfSxddZwGDp8p4Q57DfoX";
const mobileWallet = "8LfpJdYTjKU9ZdBZUErzMydRqGNrihKn2qvjwtBfYK2r";

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
