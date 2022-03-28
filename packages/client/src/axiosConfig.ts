import axios from "axios";

export const saxios = axios.create({ baseURL: "http://127.0.0.1:8081" });

export const setAuthToken = (newToken: string) =>
  (saxios.defaults.headers.common.Authorization = newToken);

export const OpenRails = {
  async Authenticate(signature: string, publicKey: string) {
    return saxios.post("auth/solana", { signature, publicKey });
  },
  async GetNonce(publicKey: string) {
    return saxios.get("auth/get-nonce", {
      params: {
        publicKey,
      },
    });
  },
};

export default saxios;
