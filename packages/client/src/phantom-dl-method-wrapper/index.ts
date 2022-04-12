import { Transaction } from "@solana/web3.js";
import axios from "axios";
import connect from "./connect";
import disconnect from "./disconnect";

export interface ConfigObject {
  app_url: string;
  dapp_encryption_public_key: string;
  redirect_link_connect: string;
  redirect_link_disconnect: string;
  public_key: string;
}

export class DeepLinking {
  session: string | null = null;
  connect() {
    return connect({
      app_url: this.config.app_url,
      dapp_encryption_public_key: this.config.dapp_encryption_public_key,
      redirect_link: this.config.redirect_link_connect,
    });
  }
  disconnect() {
    const nonce = "";

    return disconnect({
      dapp_encryption_public_key: this.config.dapp_encryption_public_key,
      nonce,
      payload: "",
      redirect_link: this.config.redirect_link_disconnect,
    });
  }
  signAndSendTransaction(transaction: Transaction) {}
  public constructor(private config: ConfigObject) {}
}

export const initDeepLinking = (newSolanaObject: DeepLinking) => {
  window.solana = newSolanaObject;
};

export const getTypedWindowSolana = () => {
  return window.solana as DeepLinking;
};

export default DeepLinking;
