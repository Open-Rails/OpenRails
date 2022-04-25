import Box from "@mui/material/Box";
import React from "react";
import {
  initDeepLinking,
  getTypedWindowSolana,
  DeepLinking,
  ConfigObject,
} from "../index";
import { createAppUrl } from "../../routing";
import { connectURL } from "../connect";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation } from "react-router-dom";
import { Keypair,  } from "@solana/web3.js";

const kp = new Keypair();

console.log("public:", kp.publicKey.toString());
console.log("private:", kp.secretKey);

const settingsDL: ConfigObject = {
  app_url: "https://openrails.io",
  dapp_encryption_public_key: "B9ai1yoP6Axe7rT4tQNS57f5ckN6qW6TEEo4MzkF775p",
  redirect_link_connect: createAppUrl("connect"),
  redirect_link_disconnect: createAppUrl("disconnect"),
};

initDeepLinking(new DeepLinking(settingsDL));
const phantomWrapper = getTypedWindowSolana();

export const PhandomDLPlayground: React.FC = () => {
  const location = useLocation();
  const [log, setLog] = React.useState<string[]>([]);

  React.useEffect(() => {
    const handleDeepLinkingURL = (urlString: string) => {
      const url = new URLSearchParams(urlString);

      console.log("URL: ", url);
    };

    const urlParams = new URLSearchParams(location.search);

    const data = urlParams.get("data");
    const nonce = urlParams.get("nonce");
    const phantom_encryption_public_key = urlParams.get(
      "phantom_encryption_public_key"
    );

    if (data && nonce && phantom_encryption_public_key && phantomWrapper) {
      setLog([data, nonce, phantom_encryption_public_key]);

      phantomWrapper.connectDLHandler(
        data,
        nonce,
        phantom_encryption_public_key
      );
    }
  }, []);

  const connurl = connectURL({
    app_url: settingsDL.app_url,
    cluster: "devnet",
    dapp_encryption_public_key: settingsDL.dapp_encryption_public_key,
    redirect_link: settingsDL.redirect_link_connect,
  });

  console.log("connurl->   ", connurl);

  const dlTest = createAppUrl("connect?hola=chao&cala=mar");

  return (
    <Box borderRadius="15px" border="2px solid grey">
      PhantomDLPLayground
      <pre>{JSON.stringify(settingsDL, null, 1)}</pre>
      <pre> {JSON.stringify(log)}</pre>
      <a href={connurl}>{connurl}</a>
      <a href={dlTest}>self link test</a>
      <QRCodeCanvas value={connurl} />
      end
    </Box>
  );
};

export default PhandomDLPlayground;
