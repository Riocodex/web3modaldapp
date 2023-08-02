//importing css
import './App.css';
import './form.css';

//importing useState
import { useState } from 'react';

//importing web3modal packages

//importing to store user data and auth when connecting to web3modal
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
//importing the web3 button and web3modal
import { Web3Modal, Web3Button} from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig} from 'wagmi'
//importing the useContract write tool to integrate to contract
import {  useContractWrite } from 'wagmi'
//importing the chains , in this case we will use polygon mumbai as goerli and sepolia have issues
import { polygonMumbai } from 'wagmi/chains'



function App() {
  //importing contract abi
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
  //initializing chains..in this project we will use polygonmumbai testnet blockchain
  const chains = [polygonMumbai]
  //initializing my project id ..a prerequisite to using the web3modal
  const projectId = '8ab1f09f61d98b698626395d47355c8e'

  // State to store the value entered in the input
  const [inputValue, setInputValue] = useState('');

  // Event handler to update the state when input changes
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  //connecting users to wallet
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })

  //using  contract read not necessary tho
  // function Example(){
  //   const { data, isError, isLoading } = useContractRead({
  //     address: '0xdfE1A3D2aA130da1A786Bb6bFA341f0a764E4f35',
  //     abi: faucetAbi.abi,
  //     functionName: 'getBalance',
      
  //   })
  //   console.log("this is data", {data})
  //   return(
  //     <p>Tokens in contract = {data}</p>
  //   )
  // }

  //use contractwrite to connect to integrate to the contract and call the request tokens
  function ContractWrite(){
    const { data, isLoading, isSuccess, write } = useContractWrite({
      address: '0xdfE1A3D2aA130da1A786Bb6bFA341f0a764E4f35',
      abi: faucetAbi.abi,
      functionName: 'requestTokens',
    })
    return(
      // button that integrates smartcontract  to approve and send busd
      <button 
        className="form-button"
        onClick={() =>
          // defining arguments to insert, in this case its going to be the address the user inputs in the website which is input value
          write({
            args: [inputValue],
          })
        }
        >Submit</button>
    )
  }
  //initializing user
  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  

  return (
    <div className="App">
      {/* wrapping the div with wagmi config for query client */}
     <WagmiConfig config={wagmiConfig}>
        <h1>Wallet Connect Dapp</h1>
        <p>Please paste this address in your wallet to import the BUSD from mumbai testnet "0xD1f316B50E8D68a5Aa135CAd16CDA8f500fD12bf"</p>
        {/* button for wallet connect */}
        <Web3Button />
        {/* button end */}

        {/* <Example /> */}
       
       {/* form */}
        <div className="form-container">
      <div className="form">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter address"
        className="form-input"
      />
      {/* submit button function */}
         <ContractWrite/>
        {/* submit button end */}
      </div>
    </div>

    {/* form end */}

    {/* <p>Balance = {data}</p> */}
      </WagmiConfig>
    {/* defining project id for auth */}
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />

      
    

    </div>
  );
}

export default App;
