# Getting Started with the Web3ModalApp

Hello PixelDat HR! My name is Onwuka Rosario, here is the fullstack project i was assgined and in this readme i will explain the code thoroughly while listing issues i had and solutions to it

## Front End
In the development of the frontend app i had no issues with the development, i used custom css along with base react css that is "App.css" to design the look, then i added the wallet connect web3modal to help users connect to the application.

### Issues and Solutions
importing walletconnect and the web3modal to connect users to the app through wallet was a bit of a hassle. It couldnt install and it was a serious problem. I contacted one of the devs in the industry and he addressed the issue with a solution to install everything once again but adding the `--force` command after inputing the command installation so instead of `npm install @web3modal/ethereum @web3modal/react wagmi viem` he also said part of the reason i had problems was because i used `create-react-app` instead of react+vite. I used `npm install @web3modal/ethereum @web3modal/react wagmi viem --force` and the installation went succesfully  after this everything went fine and i succesfully finished the frontend and connection to wallets.

## Contract Integration
I installed the dependencies and packages, created the contract token for busd and another contract for sending busd tokens called faucetcontract integrated the faucetcontract to help users send busd to the specified addresss.

### Issues and Solutions
- when i was trying to integrate with ethers.js it couldnt work, wallet connect and web3modal dont support the use of ethers.js  the use viem instead, which is way faster and easier...i connected to my wallet with ease in very little lines of code, this doesnt meet the requirements you mentioned which is to use ethers.Js but to use ethers.js ill have to use it from the begining in other words, ill have to use it to connect wallets which goes against what you said , web3modal doesnt support ethers.js hence the installation`npm install @web3modal/ethereum @web3modal/react wagmi viem` 
- i got an error about query selector, the way to fix it is to wrap the contract write in a wagmi config, which is why i made a function component for the submit button where it uses contract write, and added it in the wagmi config

## Summary
I had fun doing this, i love challenges and using new tools thoough i am experienced with wallet connect, but the changes it had me excited and i had fun debugging and finding new ways to ensure the progress of this project, thats why i find myself the perfect candidate for your team because despite all the errors and issues i may get i will still find a way to prevail. Hope you enjoyed and understood the summary and explanations. Cant wait to work with you. Find the live link to the website [here](https://web3modaldapp.vercel.app/)

