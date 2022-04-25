import { Transaction, PublicKey, Keypair } from "@solana/web3.js";
import connect from "./connect";
import disconnect from "./disconnect";
import signAndSendTransaction from "./signAndSendTransaction";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { connectURL } from "./connect";

export interface ConfigObject {
  app_url: string;
  dapp_encryption_public_key: string;
  redirect_link_connect: string;
  redirect_link_disconnect: string;
}

export class DeepLinking {
  session: string | null = null;
  xkey = nacl.box.keyPair.fromSecretKey(
    new Uint8Array([
      75, 15, 153, 122, 191, 60, 69, 94, 254, 218, 68, 228, 187, 121, 213, 132,
      139, 14, 90, 175, 174, 101, 106, 251, 126, 181, 196, 78, 254, 27, 81, 187,
    ])
  );

  get connectURL() {
    return connectURL({
      app_url: this.config.app_url,
      cluster: "devnet",
      dapp_encryption_public_key: bs58.encode(this.xkey.publicKey),
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

    const decripted = nacl.box.open(
      decodedData,
      decodedNonce,
      decodedPhantom_encryption_public_key,
      this.xkey.secretKey
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
    config.redirect_link_connect = config.redirect_link_connect;
    config.redirect_link_disconnect = config.redirect_link_disconnect;
  }
}

let deepLinking: DeepLinking | null = null;
export const initDeepLinking = (newSolanaObject: DeepLinking) => {
  deepLinking = newSolanaObject;
  return deepLinking;
};

export const getTypedWindowSolana = () => {
  return deepLinking; //window.solana as DeepLinking;
};

export default DeepLinking;
