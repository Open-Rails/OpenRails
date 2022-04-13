import Box from "@mui/material/Box";
import React from "react";
import { initDeepLinking, getTypedWindowSolana, DeepLinking } from "../index";
import { createAppUrl } from "../../routing";

const settingsDL = {
  app_url: createAppUrl(""),
  dapp_encryption_public_key: "",
  redirect_link_connect: createAppUrl("connect"),
  public_key: "",
  redirect_link_disconnect: createAppUrl("disconnect"),
};
initDeepLinking(new DeepLinking(settingsDL));

const solana = getTypedWindowSolana();

export const PhandomDLPlayground: React.FC = () => {
  React.useEffect(() => {
    // solana
    //   .connect()
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch(console.error);
  }, []);

  return (
    <Box borderRadius="15px" border="2px solid grey">
      PhantomDLPLayground

      <br/>
      Config
      <pre>{JSON.stringify(settingsDL, null, 1)}</pre>

    </Box>
  );
};

export default PhandomDLPlayground;
