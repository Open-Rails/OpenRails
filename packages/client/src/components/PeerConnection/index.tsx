import React from "react";
import usePeerConnectionContext from "../../hooks/usePeerConnection";
import { useQueryParam, StringParam } from "use-query-params";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { QRCodeCanvas } from "qrcode.react";

export const PeerConnection = () => {
  const { connect, myPeerId } = usePeerConnectionContext();
  const [otherPeerID, setOtherPeerID] = React.useState("");

  const [connectTo, setConnectTo] = useQueryParam("connect-to", StringParam);

  React.useEffect(() => {
    if (connectTo) {
      setOtherPeerID(connectTo);
      setConnectTo(undefined);
    }
  }, [connect, connectTo, setConnectTo]);

  const shareUrl = `http://localhost:3000/?connect-to=${myPeerId}`;

  return (
    <Card elevation={8}>
      <CardContent>
        <p>Peer connection demo</p>
        <p>Your Peer ID is {myPeerId}</p>

        {myPeerId && <QRCodeCanvas value={shareUrl} />}
        <p>{`http://localhost:3000/?connect-to=${myPeerId}`}</p>
        <br />
        <TextField
          label="Other's Peer ID"
          type="text"
          value={otherPeerID}
          onChange={(event) => {
            setOtherPeerID(event.target.value);
          }}
        />
      </CardContent>

      <CardActions>
        <Button onClick={() => connect(otherPeerID)}>Connect to Peer</Button>
      </CardActions>
    </Card>
  );
};

export default PeerConnection;
