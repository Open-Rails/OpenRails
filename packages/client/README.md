## To Do:

- We should look into creating rooms rather than individual identifiers, that way people can join a mesh-network rather than connecting to an individual. Right now you can have non-mesh network connections with multiple participants.
- Test with Safari, not just Chrome and Firefox
- Use port 443 and 'secure: true' in the client
- PeerJS's terminology is SUPER confusing; i.e. a 'peer' is actually a server, not a person. A 'connection' is a person. We need to change all this terminology. Look at Wallet Connect's terminology.
- Add Copy URL button
- Auto-connect upon visiting url
- Deploy connect-server to a url of its own
- Update documentation frontpage
- Submit YC application

## To Research:

- Connections should be able to survive a browser-refresh or changing the browser page (non-SPA pages); maybe cache the identifier of the other person and attempt to reconnect. Do we need our peer signal server to do this, or can it be done directly after we establish a connection?
- Is there a way to know if the other person recieved our message or not? A confirmation would be nice
- Are the webrtc messages being sent encrypted? How does that encryption work?
- Can two mobile-pages on the same device talk to each other?
- Look into EasyRTC and SimpleWebRTC as alternatives to PeerJS
- How do we know when a WebRTC connection has failed? WebRTC uses SCTP, it's own transport-layer protocol, which has TCP-like retransmission properties.
- Learn about NFC
- Think of a way to implement a blockchain notification-system to your wallet
- Learn more about Waku and Libp2p

## Robustness Tests:

- Desktop Browser <-> Mobile Browser:

  - Mobile recieves messages when backgrounded (other tab, or other app is in focus), as long as it's brought back within 20 seconds or so. Otherwise the WebRTC connection dies.
  - Mobile reconnects automatically when airplane mode is turned on and then off during a connection, however the WebRTC connection can only be re-established after a disruption of less than 10 seconds or so, otherwise it's considered dead and won't auto-reconnect. Messages recieved or sent during the disconnected period will be recieved upon reconnect.
  - A TURN server is needed for cellular connections (maybe not always, but for my testing this was the case).
  - If you connect using a TURN server, and then switch to a connection that doesn't need a TURN server, the TURN server will continue to be used, and the connection will survive. (For example, connect on cellular and then switch to wifi.) However if you connect without a TURN server, and later need one, the connection will die rather than being upraded. (For example, connect on wifi and then switch to cellular.)

- Mobile Browser <-> Mobile Browser (same device):
  - Tabs within the same browser can connect and talk to each other. The Connections will persist as long as at least one the tabs is open. If the browser-app is backgrounded, or another app is switched to, then the connection will terminate after around 15 seconds.

## Robustness Needed:

- If the WebRTC connection breaks, the other side of the connection should recall their peer's ID and the url of their signal-server. They should both try to reconnect by using that server automatically.
- Connections need to survive refresh and browser-closes, probably by remembering the other party's url + id.
- Messages need to be idempotent, in the sense that if the same message is sent multiple times, it should only be received once. (This is probably already the case--just don't allow multiple-connect requests if the firt one is taking a while to load.)

## Notes:

- Apparently we are using Google's public STUN servers. We might want to use our own at some point.
- Connections to other people will survive the peer-server being disconnected from.
- When FireFox is connected to a remote-peer, and that peer closes the connection, Firefox will not emit an event that it was closed. This isn't a big deal, firefox will recieve an 'ICE failed' error after 30 seconds. Unfortunately when Firefox attempts to send a message to a disconnected participant there will be no error emitted.

## Thoughts:

- Dapp:

  - Client: runs in the user's browser
  - Server: runs in a protected remote server
  - Kiosk: runs in a protected local device

- Dapp requests connection: it connects to the signal-server, and recieves an identifier. It then shares this identifier with the user and a link to the signal-server (deep link, QR code, NFC). The user then visits this URL, and the wallet connects to the signal-server. From there it establishes a direct webrtc connection.

- Wallet requests connection: this is not really practical; if the Dapp is in a server, then the server will already have an http-endpoint which the wallet can interact with, so there's no need for a webrtc connection. If the dapp is in a client machine or kiosk, the client-machine or kiosk will need to have specially programmed routes looking for a connection at any time, and will have to know how to handle them when they occur, and the hardware needed to establish the connection; for example, a qr-code scanner like at the airport or an NFC reader like an apple-pay POS. In all these cases it makes more sense for the connection-request to come from the dapp, rather than from the wallet.

- wallet-wallet connection: wallet connects to the signal-server, and recieves an identifier. It presents this as a QR code or using NFC. They use this to establish a webrtc connection through cellular or wifi signal. (If the two are in physical proximity, I wonder if the connection can be routed entirely via NFC?)
