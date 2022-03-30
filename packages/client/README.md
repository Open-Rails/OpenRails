## To Do:

- Figure out how to set your host url, and deploy to a server rather than just localhost
- The event listeners are not being handled symmetrically; they should be handled the same regardless of whether or not you are the caller or the answerer.
- We should look into creating rooms rather than individual identifiers, that way people can join a mesh-network rather than connecting to an individual. Right now you can have non-mesh network connections with multiple participants.
- Configure our own TURN server. There are commented out pieces of code to set a TURN server
- Test with Safari, not just Chrome and Firefox
- Test on mobile

## To Research:

- Connections should be able to survive a browser-refresh or changing the browser page (non-SPA pages); maybe cache the identifier of the other person and attempt to reconnect. Do we need our peer signal server to do this, or can it be done directly after we establish a connection?
- The terminology is SUPER confusing; i.e. a 'peer' is actually a server, not a person. A 'connection' is a person. What terminology does Wallet Connect use?
- Is there a way to know if the other person recieved our message or not? A confirmation would be nice
- Are the webrtc messages being sent encrypted? How does that encryption work?

## Notes:

- Connections to other people will survive the peer-server being disconnected from.
- When FireFox is connected to a remote-peer, and that peer closes the connection, Firefox will not emit an event that it was closed. This isn't a big deal, firefox will recieve an 'ICE failed' error after 30 seconds. Unfortunately when Firefox attempts to send a message to a disconnected participant there will be no error emitted.
