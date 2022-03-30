import React from 'react'
import Peer from 'peerjs'
import produce from 'immer'

const PEER_DOMAIN = process.env.REACT_APP_PEER_DOMAIN || 'localhost'

export interface IPeerConnectionContext {
  connect(otherPeerId: string): void
  sendData(): void
  myPeerId?: string
}

export type PeerStatus = 'connecting' | 'connected' | 'disconnected' | 'destroyed' | 'error'

const PeerConnectionContext = React.createContext<IPeerConnectionContext>(null!)

export const PeerConnectionContextProvider: React.FC = ({ children }) => {
  const [myPeerId, setMyPeerId] = React.useState<string>()
  const [peerStatus, setPeerStatus] = React.useState<PeerStatus>('connecting')
  const [connections, setConnections] = React.useState(new Map<string, Peer.DataConnection>())
  const [peer, setPeer] = React.useState(
    () =>
      new Peer({
        host: PEER_DOMAIN,
        port: 9000,
        debug: 2,
        path: '/myapp',
        key: 'peerjs',
        config: {
          // iceServers: [
          //   { urls: ['stun:stun.l.google.com:19302'] },
          //   { urls: ['turn:homeo@turn.bistri.com:80'], credential: 'homeo' }
          // ]
        }
      })
  )

  // method for connecting to remote peer
  const connect = React.useCallback(
    (otherPeerId: string) => {
      const connection = peer.connect(otherPeerId)

      connection.on('open', () => {
        initializeConnection(connection)
      })
    },
    [peer]
  )

  // method for sending data to remote peer
  const sendData = React.useCallback(() => {
    return connections.forEach((conn, connId) => {
      const sentMessage = JSON.stringify({
        msg: 'message',
        description: 'description',
        sentTo: connId
      })
      console.log('sentMessage->', sentMessage)
      conn.send(sentMessage)
    })
  }, [connections])

  // called when we recieve an inbound connection request, or when our outbound connection request completes
  const initializeConnection = React.useCallback((connection: Peer.DataConnection) => {
    setConnections(
      produce(mapDraft => {
        mapDraft.set(connection.peer, connection)
      })
    )

    // initial demo hello message
    connection.send(
      JSON.stringify({
        publicKey: 'iqjeoiqjeoiblabla',
        amount: '0.00001',
        token: 'SOL'
      })
    )

    connection.on('data', data => {
      console.log('data recieved: ', data)
    })

    connection.on('error', err => {
      console.error(err)
      setConnections(
        produce(mapDraft => {
          mapDraft.delete(connection.peer)
        })
      )
    })

    connection.on('close', () => {
      console.log(`closed connection with "${connection.peer}$`)
      setConnections(
        produce(mapDraft => {
          mapDraft.delete(connection.peer)
        })
      )
    })
  }, [])

  // establishes handlers for signal-server events
  React.useEffect(() => {
    if (!peer) throw new Error('No peer created bitch')

    const onDisconnectionHandler = () => {
      console.log('Peer disconnected')
      setPeerStatus('disconnected')
    }

    const onClosedHandler = () => {
      console.log('Peer destroyed and closed')
      setPeerStatus('destroyed')
    }
    const onOpenHandler = (id: string) => {
      setMyPeerId(id)
      setPeerStatus('connected')
    }
    const onErrorHandler = (err: any) => {
      console.error(err)
      setPeerStatus('error')
    }

    peer.on('error', onErrorHandler)
    peer.on('connection', initializeConnection)
    peer.on('open', onOpenHandler)
    peer.on('disconnected', onDisconnectionHandler)
    peer.on('close', onClosedHandler)

    return () => {
      peer.off('error', onErrorHandler)
      peer.off('connection', initializeConnection)
      peer.off('open', onOpenHandler)
      peer.off('disconnected', onDisconnectionHandler)
      peer.off('close', onClosedHandler)
    }
  }, [peer])

  const value: IPeerConnectionContext = { connect, myPeerId, sendData }

  return <PeerConnectionContext.Provider value={value}>{children}</PeerConnectionContext.Provider>
}

export const usePeerConnectionContext = () => {
  const ctx = React.useContext(PeerConnectionContext)

  if (!ctx) {
    throw new Error(
      'You need to call usePeerConnectionContext within an PeerConnectionContextProvider'
    )
  }

  return ctx
}

export default usePeerConnectionContext
