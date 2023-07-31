import './App.css';
import './form.css';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, Web3Button, useWeb3ModalTheme } from '@web3modal/react'
import { useState } from 'react';
import { configureChains, createConfig, WagmiConfig} from 'wagmi'
import { useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
// import { abi } from "./abi/faucetAbi.json"


function App() {
  const faucetAbi = {
    "abi":[
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "tokenAddress",
            "type": "address"
          }
        ],
        "stateMutability": "payable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Deposit",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "by",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "EthWithdrawn",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "FeePaid",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          }
        ],
        "name": "requestTokens",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "setLockTime",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "setWithdrawalAmount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Withdrawal",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "withdrawEth",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      },
      {
        "inputs": [],
        "name": "getBalance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "lockTime",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "token",
        "outputs": [
          {
            "internalType": "contract IERC20",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdrawalAmount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ],
  }
  const chains = [polygonMumbai]
  const projectId = '8ab1f09f61d98b698626395d47355c8e'
  const { theme, setTheme } = useWeb3ModalTheme()
  // State to store the value entered in the input
  const [inputValue, setInputValue] = useState('');

  // Event handler to update the state when input changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButton = async()=>{
    console.log('clicked')
  }

  setTheme({themeColor:"orange"})
  
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })

  //use contract read
  function Example(){
    const { data, isError, isLoading } = useContractRead({
      address: '0xdfE1A3D2aA130da1A786Bb6bFA341f0a764E4f35',
      abi: faucetAbi.abi,
      functionName: 'getBalance',
      
    })
    console.log("this is data", {data})
    return(
      <p>Tokens in contract = {data}</p>
    )
  }

  //use contractwrite
  function ContractWrite(){
    const { data, isLoading, isSuccess, write } = useContractWrite({
      address: '0xdfE1A3D2aA130da1A786Bb6bFA341f0a764E4f35',
      abi: faucetAbi.abi,
      functionName: 'requestTokens',
    })
    return(
      <button 
        className="form-button"
        onClick={() =>
          write({
            args: [inputValue],
          })
        }
        >Submit</button>
    )
  }
  
  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  

  return (
    <div className="App">
     <WagmiConfig config={wagmiConfig}>
        <h1>Wallet Connect Dapp</h1>
        <p>Please paste this address in your wallet to import the BUSD from mumbai testnet "0xD1f316B50E8D68a5Aa135CAd16CDA8f500fD12bf"</p>
        <Web3Button />
        <Example />
       
        <div className="form-container">
      <div className="form">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter address"
        className="form-input"
      />
         <ContractWrite/>
      </div>
    </div>

    {/* <p>Balance = {data}</p> */}
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

      
    

    </div>
  );
}

export default App;
