## To Do:

- Be able to deploy to heroku. Currently the PeerJS server is not connecting to the client
- We should look into creating rooms rather than individual identifiers, that way people can join a mesh-network rather than connecting to an individual. Right now you can have non-mesh network connections with multiple participants.
- Configure our own TURN server. There are commented out pieces of code to set a TURN server
- Test with Safari, not just Chrome and Firefox
- Test on mobile
- Have a canvas-logger for messages
- Use port 443 and 'secure: true' in the client

## To Research:

- Connections should be able to survive a browser-refresh or changing the browser page (non-SPA pages); maybe cache the identifier of the other person and attempt to reconnect. Do we need our peer signal server to do this, or can it be done directly after we establish a connection?
- The terminology is SUPER confusing; i.e. a 'peer' is actually a server, not a person. A 'connection' is a person. What terminology does Wallet Connect use?
- Is there a way to know if the other person recieved our message or not? A confirmation would be nice
- Are the webrtc messages being sent encrypted? How does that encryption work?
- Test to see if the webrtc connection remains on a mobile device when the mobile device changes its network (same for a desktop computer)
- For mobile devices, what happens when the page is backgrounded? Can two mobile-pages on the same device talk to each other?

## Notes:

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
