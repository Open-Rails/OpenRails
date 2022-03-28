import React from "react";
import {
  Cluster,
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
} from "@solana/web3.js";
import { encodeURL, createQR } from "@solana/pay";
import BigNumber from "bignumber.js";

const MERCHANT_PUB_KEY = "9TqAc82mjy2jk4VN58thW2LqJwS3gKr2KSwa9kC57h4J";

export const MerchantURL: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null!);

  async function createPayment() {
    // Variable to keep state of the payment status
    let paymentStatus: string;

    // Connecting to devnet for this example
    console.log("1. ✅ Establish connection to the network");
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    //   // -- snippet -- //

    //   /**
    //    * Simulate a checkout experience
    //    *
    //    * Recommendation:
    //    * `amount` and `reference` should be created in a trusted environment (server).
    //    * The `reference` should be unique to a single customer session,
    //    * and will be used to find and validate the payment in the future.
    //    *
    //    */

    console.log("2. 🛍 Simulate a customer checkout \n");
    console.log(`Merchant Pub Key: ${MERCHANT_PUB_KEY}`);
    const recipient = new PublicKey(MERCHANT_PUB_KEY);

    const amount = new BigNumber(20);
    const reference = new Keypair().publicKey;
    const label = "Jungle Cats store";
    const message = "Jungle Cats store - your order - #001234";
    const memo = "JC#4098";

    //   /**
    //    * Create a payment request link
    //    *
    //    * Solana Pay uses a standard URL scheme across wallets for native SOL and SPL Token payments.
    //    * Several parameters are encoded within the link representing an intent to collect payment from a customer.
    //    */
    console.log("3. 💰 Create a payment request link \n");

    console.log("recipient: ", recipient);
    console.log("amount: ", amount);
    console.log("reference: ", reference);
    console.log("label: ", label);
    console.log("message: ", message);
    console.log("memo: ", memo);

    // const url = encodeURL({
    //   recipient,
    //   amount,
    //   reference,
    //   label,
    //   message,
    //   memo,
    // });

    const costumURL = `solana:${recipient}?amount=${amount}&label=${label}&message=${message}&memo=${memo}&reference=${reference}`;
    const encodedURL = encodeURI(costumURL);

    console.log(`encodedURL -> ${encodedURL}`);
    // console.log(`url -> ${url}`);
    //   // encode URL in QR code
    // const qrCode = createQR(encodedURL);

    return { encodedURL };
  }

  React.useEffect(() => {
    createPayment().then((res) => {
      //   res.qrCode.download();
    });
  }, []);

  return (
    <div style={{ background: "coral" }}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default MerchantURL;
