# Getting Started with the Web3ModalApp

Hello PixelDat HR! My name is Onwuka Rosario, here is the fullstack project i was assgined and in this readme i will explain the code thoroughly while listing issues i had and solutions to it

## Front End
In the development of the frontend app i had no issues with the development, i used custom css along with base react css that is "App.css" to design the look, then i added the wallet connect web3modal to help users connect to the application.

### Issues and Solutions
importing walletconnect and the web3modal to connect users to the app through wallet was a bit of a hassle. It couldnt install and it was a serious problem. I contacted one of the devs in the industry and he addressed the issue with a solution to install everything once again but adding the `--force` command after inputing the command installation so instead of `npm install @web3modal/ethereum @web3modal/react wagmi viem` i used `npm install @web3modal/ethereum @web3modal/react wagmi viem --force` and the installation went succesfully

