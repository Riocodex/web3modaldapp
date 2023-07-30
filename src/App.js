import './App.css';
import './form.css';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, Web3Button, useWeb3ModalTheme } from '@web3modal/react'
import { useState } from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { sepolia } from 'wagmi/chains'


function App() {
  const chains = [sepolia]
  const projectId = '8ab1f09f61d98b698626395d47355c8e'
  const { theme, setTheme } = useWeb3ModalTheme()
  // State to store the value entered in the input
  const [inputValue, setInputValue] = useState('');

  // Event handler to update the state when input changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  setTheme({themeColor:"orange"})
  
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  

  return (
    <div className="App">
     <WagmiConfig config={wagmiConfig}>
        <h1>Wallet Connect Dapp</h1>
        <Web3Button />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

       <div className="form-container">
      <form className="form">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter address"
        className="form-input"
      />
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
    

    </div>
  );
}

export default App;
