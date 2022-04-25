import { Transaction, PublicKey, Keypair } from "@solana/web3.js";
import connect from "./connect";
import disconnect from "./disconnect";
import signAndSendTransaction from "./signAndSendTransaction";
import nacl from "tweetnacl";
import bs58 from "bs58";

export interface ConfigObject {
  app_url: string;
  dapp_encryption_public_key: string;
  redirect_link_connect: string;
  redirect_link_disconnect: string;
}

export class DeepLinking {
  session: string | null = null;
  get connect() {
    return connect({
      app_url: this.config.app_url,
      dapp_encryption_public_key:
        this.config.dapp_encryption_public_key.toString(),
      redirect_link: this.config.redirect_link_connect,
    });
  }
  connectDLHandler(
    data: string,
    nonce: string,
    phantom_encryption_public_key: string
  ) {
    const decodedData = bs58.decode(data);
    const decodedNonce = bs58.decode(nonce);
    const decodedPhantom_encryption_public_key = bs58.decode(
      phantom_encryption_public_key
    );

    console.log("decodedData", decodedData);
    console.log("decodedNonce", decodedNonce);
    console.log(
      "decodedPhantom_encryption_public_key",
      decodedPhantom_encryption_public_key
    );

    const keypair = Keypair.fromSeed(decodedPhantom_encryption_public_key);

    const decripted = nacl.box.open(
      decodedData,
      decodedNonce,
      decodedPhantom_encryption_public_key,
      keypair.publicKey.toBytes()
    );

    console.log("decripted", decripted);

    localStorage.setItem(
      "phantom_encryption_public_key",
      phantom_encryption_public_key
    );
  }
  disconnect() {
    const nonce = "";

    return disconnect({
      dapp_encryption_public_key:
        this.config.dapp_encryption_public_key.toString(),
      nonce,
      payload: "",
      redirect_link: this.config.redirect_link_disconnect,
    });
  }
  signAndSendTransaction(transaction: Transaction) {
    signAndSendTransaction({
      dapp_encryption_public_key:
        this.config.dapp_encryption_public_key.toString(),
      nonce: "",
      payload: "",
      redirect_link: "",
    });
  }
  public constructor(private config: ConfigObject) {
    config.redirect_link_connect = encodeURI(config.redirect_link_connect);
    config.redirect_link_disconnect = encodeURI(
      config.redirect_link_disconnect
    );
  }
}

let deepLinking: DeepLinking | null = null;
export const initDeepLinking = (newSolanaObject: DeepLinking) => {
  deepLinking = newSolanaObject;
};

export const getTypedWindowSolana = () => {
  return deepLinking; //window.solana as DeepLinking;
};

export default DeepLinking;
