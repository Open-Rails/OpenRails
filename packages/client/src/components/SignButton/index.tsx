import React from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import nacl from 'tweetnacl'
import { nanoid } from 'nanoid'

const baseMsg = `This signature proves ownership of
your public key. 

Clicking "Approve" or "Sign" does not
submit a blockchain transaction, and
does not incur any gas fee.`

const SignButton: React.FC = () => {
  const { publicKey, signMessage } = useWallet()

  const requestSignature = React.useCallback(
    async (message: string) => {
      try {
        const nonce = `\n \n nonce: ${nanoid(10)}`
        const encodedMessage = new TextEncoder().encode(message + nonce)

        if (signMessage && publicKey) {
          const signature = await signMessage(encodedMessage)
          const verified = nacl.sign.detached.verify(encodedMessage, signature, publicKey.toBytes())
          if (verified) console.log('signature is legit')
          else console.log('signature is a fraud')

          // console.log('it worked!', parsedString)
        } else throw new Error('signMessage method undefined or pubkey missing')
      } catch (err) {
        console.error(err)
      }
    },
    [signMessage]
  )

  return <button onClick={() => requestSignature(baseMsg)}>Sign This Message</button>
}

export default SignButton
