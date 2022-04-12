import { Cluster } from "@solana/web3.js";
import axios from "axios";
import { buildProviderMethodUrlV1, PhantomErrorResponse } from "./util";

export interface DisconnectParameters {
  dapp_encryption_public_key: string; // (required): The original encryption public key used from the app side for an existing Connect session.
  nonce: string; // (required): A nonce used for encrypting the request, encoded in base58.
  redirect_link: string; // (required) The URI where Phantom should redirect the user upon completion. Please review Specifying Redirects for more details.
  payload: string; // (required) An encrypted JSON string with the following fields:
  //   {
  //     "session": "...", // token received from the connect method
  // }
  // session (required): The session token received from the Connect method. Please see Handling Sessions for more details.
}

export interface DisconnectResponse {
  // No query params returned.
}

export function disconnect(params: DisconnectParameters) {
  const disconnectUrl = buildProviderMethodUrlV1("disconnect");

  return axios.get<any, DisconnectResponse, PhantomErrorResponse>(
    disconnectUrl,
    {
      params,
    }
  );
}

export default disconnect;
