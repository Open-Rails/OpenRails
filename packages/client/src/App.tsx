import React from 'react'
import logo from './logo.svg'
import './App.css'
import Wallet from './components/Wallet'
import SendButton from './components/SendButton'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Wallet>
          <SendButton />
        </Wallet>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
