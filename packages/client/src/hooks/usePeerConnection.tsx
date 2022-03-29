import React from "react";
import Peer from "peerjs";

export interface IPeerConnectionContext {
  connect: (otherPeerId: string) => void;
  myPeerId: string;
}

const PeerConnectionContext = React.createContext<IPeerConnectionContext>(
  null!
);

export const PeerConnectionContextProvider: React.FC = ({ children }) => {
  const [myPeerId, setMyPeerId] = React.useState("");
  const [peer, setPeer] = React.useState(
    () =>
      new Peer({
        port: 9000,
        debug: 3,
        path: "myapp",
        host: "localhost",
      })
  );

  React.useEffect(() => {
    if (!peer) throw new Error("No peer created bitch");

    const onConnectionHandler: (conn: Peer.DataConnection) => void = (
      conn: Peer.DataConnection
    ) => {
      console.log("Connected");
      setMyPeerId(peer.id);

      conn.on("data", (data) => {
        console.log("Data-> ", data);
      });
      conn.on("open", () => {
        console.log("Opened");

        conn.send("hello!");
      });
    };

    const onDisconnectionHandler = () => {
      console.log("Disconnected");
    };

    const onClosedHandler = () => {
      console.log("Closed");
    };
    const onOpenHandler = (id: string) => {
      setMyPeerId(id);
    };

    peer.on("error", console.error);
    peer.on("connection", onConnectionHandler);
    peer.on("open", onOpenHandler);
    peer.on("disconnected", onDisconnectionHandler);
    peer.on("close", onClosedHandler);

    return () => {
      peer.off("error", console.error);
      peer.off("connection", onConnectionHandler);
      peer.off("open", onOpenHandler);
      peer.off("disconnected", onDisconnectionHandler);
      peer.off("close", onClosedHandler);
    };
  }, [peer]);

  const connect = React.useCallback(
    (otherPeerId: string) => {
      const connection = peer.connect(otherPeerId);
      connection.on("open", () => {
        connection.send("hi!");
      });
    },
    [peer]
  );

  const value: IPeerConnectionContext = { connect, myPeerId };

  return (
    <PeerConnectionContext.Provider value={value}>
      {children}
    </PeerConnectionContext.Provider>
  );
};

export const usePeerConnectionContext = () => {
  const ctx = React.useContext(PeerConnectionContext);

  if (!ctx) {
    throw new Error(
      "You need to call usePeerConnectionContext within an PeerConnectionContextProvider"
    );
  }

  return ctx;
};

export default usePeerConnectionContext;
