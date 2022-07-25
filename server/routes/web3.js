// var express = require('express');
// var router = express.Router();
// //var abi = require('../models/ProofContract')
// let Web3 = require('web3');
// var NodeRSA = require('node-rsa')
// var Accounts = require('web3-eth-accounts')


// let web3;
// if (typeof web3 !== 'undefined') {
//     web3 = new Web3(web3.currentProvider);
// } else {
//     // set the provider you want from Web3.providers
//     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// }
// var abi = [
//     {
//         "constant": true,
//         "inputs": [],
//         "name": "name",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "payable": false,
//         "type": "function",
//         "stateMutability": "view"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_spender",
//                 "type": "address"
//             },
//             {
//                 "name": "_value",
//                 "type": "uint256"
//             }
//         ],
//         "name": "approve",
//         "outputs": [
//             {
//                 "name": "success",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "type": "function",
//         "stateMutability": "nonpayable"
//     },
//     {
//         "constant": true,
//         "inputs": [],
//         "name": "totalSupply",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "payable": false,
//         "type": "function",
//         "stateMutability": "view"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_from",
//                 "type": "address"
//             },
//             {
//                 "name": "_to",
//                 "type": "address"
//             },
//             {
//                 "name": "_value",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transferFrom",
//         "outputs": [
//             {
//                 "name": "success",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "type": "function",
//         "stateMutability": "nonpayable"
//     },
//     {
//         "constant": true,
//         "inputs": [],
//         "name": "decimals",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "uint8"
//             }
//         ],
//         "payable": false,
//         "type": "function",
//         "stateMutability": "view"
//     },
//     {
//         "constant": true,
//         "inputs": [],
//         "name": "version",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "payable": false,
//         "type": "function",
//         "stateMutability": "view"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_owner",
//                 "type": "address"
//             }
//         ],
//         "name": "balanceOf",
//         "outputs": [
//             {
//                 "name": "balance",
//                 "type": "uint256"
//             }
//         ],
//         "payable": false,
//         "type": "function",
//         "stateMutability": "view"
//     },
//     {
//         "constant": true,
//         "inputs": [],
//         "name": "symbol",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "payable": false,
//         "type": "function",
//         "stateMutability": "view"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_to",
//                 "type": "address"
//             },
//             {
//                 "name": "_value",
//                 "type": "uint256"
//             }
//         ],
//         "name": "transfer",
//         "outputs": [
//             {
//                 "name": "success",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "type": "function",
//         "stateMutability": "nonpayable"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_spender",
//                 "type": "address"
//             },
//             {
//                 "name": "_value",
//                 "type": "uint256"
//             },
//             {
//                 "name": "_extraData",
//                 "type": "bytes"
//             }
//         ],
//         "name": "approveAndCall",
//         "outputs": [
//             {
//                 "name": "success",
//                 "type": "bool"
//             }
//         ],
//         "payable": false,
//         "type": "function",
//         "stateMutability": "nonpayable"
//     },
//     {
//         "constant": true,
//         "inputs": [
//             {
//                 "name": "_owner",
//                 "type": "address"
//             },
//             {
//                 "name": "_spender",
//                 "type": "address"
//             }
//         ],
//         "name": "allowance",
//         "outputs": [
//             {
//                 "name": "remaining",
//                 "type": "uint256"
//             }
//         ],
//         "payable": false,
//         "type": "function",
//         "stateMutability": "view"
//     },
//     {
//         "inputs": [
//             {
//                 "name": "_initialAmount",
//                 "type": "uint256"
//             },
//             {
//                 "name": "_tokenName",
//                 "type": "string"
//             },
//             {
//                 "name": "_decimalUnits",
//                 "type": "uint8"
//             },
//             {
//                 "name": "_tokenSymbol",
//                 "type": "string"
//             }
//         ],
//         "type": "constructor",
//         "payable": true,
//         "stateMutability": "payable"
//     },
//     {
//         "payable": false,
//         "type": "fallback",
//         "stateMutability": "nonpayable"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "name": "_from",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "name": "_to",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "name": "_value",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Transfer",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "name": "_owner",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "name": "_spender",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "name": "_value",
//                 "type": "uint256"
//             }
//         ],
//         "name": "Approval",
//         "type": "event"
//     }
// ]


// // var mycontract = web3.eth.contract(abi);

// // var mycontractInstance = mycontract.at('0x1809B5749b2b6647F5eBE6e4D7198AC5180dA47E')



// console.log(web3.eth.accounts)

// console.log(mycontractInstance.balanceOf.call(accounts[0]).toString(10))

// //onsole.log(mycontractInstance)

// console.log("TicketToken发送时间：" + Math.floor(Date.now()))
// mycontractInstance.transfer.sendTransaction(accounts[1], 1000, { from: accounts[0] })
// console.log("TicketToken接收时间：" + Math.floor(Date.now()))

// console.log("TicketToken收回时间：" + Math.floor(Date.now()))
// const key = new NodeRSA({b:512})
// //加密
// let encrypted = key.encrypt('woxihuanni','base64')
// console.log(encrypted)
// let decrypted = key.decrypt(encrypted,'utf8')
// console.log(decrypted)

// mycontractInstance.approve.sendTransaction(accounts[0], 1000, { from: accounts[1] })
// Ticket_token_count = mycontractInstance.balanceOf.call(accounts[1]).toString(10)
// console.log(Ticket_token_count)
// if (Ticket_token_count >= 1000) {
//     mycontractInstance.transfer.sendTransaction(accounts[0], 1000, { from: accounts[1] })
//     mycontractInstance.transfer.sendTransaction(accounts[1], 1000, { from: accounts[0] })
// } else {
//     console.log("error")
// }
// console.log("TicketToken收回时间：" + Math.floor(Date.now()))

// //console.log(web3)


