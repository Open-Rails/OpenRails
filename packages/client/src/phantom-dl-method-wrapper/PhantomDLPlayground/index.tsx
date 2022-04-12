import Box from "@mui/material/Box";
import React from "react";
import { initDeepLinking, getTypedWindowSolana, DeepLinking} from "../index";

// initDeepLinking(new DeepLinking({app_url:"openrails.io", });

const solana = getTypedWindowSolana();

export const PhandomDLPlayground: React.FC = () => {
  React.useEffect(() => {
    solana
      .connect()
      .then((res) => {
        console.log(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <Box borderRadius="15px" border="2px solid grey">
      PhantomDLPLayground
    </Box>
  );
};

export default PhandomDLPlayground;
