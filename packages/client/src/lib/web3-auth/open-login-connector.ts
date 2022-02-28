import { TOpenLoginNetwork } from "./open-login-types";
import OpenLogin from "@toruslabs/openlogin";

const { REACT_APP_WEB3_CLIENT_ID } = process.env; 

const getProvider = async (network: TOpenLoginNetwork = "mainnet") => {
  const sdk = new OpenLogin({
    clientId: REACT_APP_WEB3_CLIENT_ID,
    network,
  });

  await sdk.init();

  return sdk;
}

export default {
  getProvider
}