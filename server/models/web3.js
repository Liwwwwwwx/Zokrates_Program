const Web3 = require('web3');
const verifier_abi = require('./verifierABI.sol.json');
const Tic_token_abi = require('./ABI/TicTokenABI.sol.json')
const InfoABI = require('./ABI/InfoABI.sol.json')
const Board_token_abi = require('./ABI/BoardTokenABI.sol.json')
const verifierContractAddress = '0xB51c5cD4764A07B3ecB7d2ec93C587D7B8885f6f'
const TicTokenContractAddress = '0x2842eD2284678A210695f263fBEc48399ac98BD1'
const InfoContractAddress = '0x764a196d76EDE6d858CB85cf6Ce292D515241Ac7'
const BoardTokentAddress = '0xd86E287331B189B962dbCfB77C64b00102CA9078'

// var accounts = [
//     '0x12F0AE57EaCe8330bA30a11D0df5486e125f24cF',
//     '0xB31310982b75a2f2a0e903aC762778a128193D32'
//   ]

let web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}


const VerifierContract = new web3.eth.Contract(
    verifier_abi,
    verifierContractAddress
);

const TickTokenContract = new web3.eth.Contract(
    Tic_token_abi,
    TicTokenContractAddress
)

const InfoContract = new web3.eth.Contract(
    InfoABI,
    InfoContractAddress
)

const BoardTokenContract = new web3.eth.Contract(
    Board_token_abi,
    BoardTokentAddress
)

// TickTokenContract.methods.approve(accounts[0], 1000).send({ from: accounts[1] })

// TickTokenContract.methods.transfer(accounts[0], 10000).send({ from: accounts[1] })

module.exports = { VerifierContract, TickTokenContract, InfoContract, BoardTokenContract, web3 }