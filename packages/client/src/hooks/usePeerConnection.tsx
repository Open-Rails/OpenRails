import React from "react";
import Peer from "peerjs";
import produce from "immer";
export interface IPeerConnectionContext {
  connect(otherPeerId: string): void;
  sendData(): void;
  myPeerId: string;
}

const PeerConnectionContext = React.createContext<IPeerConnectionContext>(
  null!
);

export const PeerConnectionContextProvider: React.FC = ({ children }) => {
  const [myPeerId, setMyPeerId] = React.useState("");
  const [peerStatus, setPeerStatus] = React.useState<
    "open" | "connecting" | "error"
  >("connecting");

  const [connections, setConnections] = React.useState(
    new Map<string, Peer.DataConnection>()
  );

  const [peer, setPeer] = React.useState(
    () =>
      new Peer({
        port: 9000,
        debug: 2,
        path: "myapp",
        host: "localhost",
      })
  );

  React.useEffect(() => {
    if (!peer) throw new Error("No peer created bitch");

    const onConnectionHandler: (conn: Peer.DataConnection) => void = (
      conn: Peer.DataConnection
    ) => {
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
      setPeerStatus("open");
    };
    const onErrorHandler = (err: any) => {
      console.error(err);
      setPeerStatus("error");
    };

    peer.on("error", onErrorHandler);
    peer.on("connection", onConnectionHandler);
    peer.on("open", onOpenHandler);
    peer.on("disconnected", onDisconnectionHandler);
    peer.on("close", onClosedHandler);

    return () => {
      peer.off("error", onErrorHandler);
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
        setConnections(
          produce((mapDraft) => {
            mapDraft.set(otherPeerId, connection);
          })
        );

        connection.send(
          JSON.stringify({
            publicKey: "iqjeoiqjeoiblabla",
            amount: "0.00001",
            token: "SOL",
          })
        );
      });
      connection.on("data", (data) => {
        console.log("connection data", data);
      });

      connection.on("error", console.error);

      connection.on("close", () => {
        console.log(`closed connection with "${otherPeerId}$`);
      });
    },
    [peer]
  );

  const sendData = React.useCallback(() => {
    return connections.forEach((conn, connId) => {
      const sentMessage = JSON.stringify({
        msg: "message",
        description: "description",
        sentTo: connId,
      });
      console.log("sentMessage->", sentMessage);
      conn.send(sentMessage);
    });
  }, [connections]);

  const value: IPeerConnectionContext = { connect, myPeerId, sendData };

  return (
    <PeerConnectionContext.Provider value={value}>
      {peerStatus === "open" && children}
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
