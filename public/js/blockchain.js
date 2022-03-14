import { ethers } from "ethers";
import Triplets from '../../Triplets.abi.json';

// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page


// export function runAlert() {
//     alert("ALERT!");
// }
// window.runAlert = () => {
//     const uri = await contract.tokenURI(tokenId);
//     alert(uri); 
//     //alert("Go Away!");
// };

// window.contractUri = () => {
//     const uri = await contract.tokenURI(tokenId);
//     alert(uri); 
// };
export async function connectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    console.log(signer);
    console.log(Triplets);
    
    const contractAddress = '0x9fcEF82DAe1a4144cc327237eDb9aC928D1eC1Df';
    
    // get the smart contract
    const contract = new ethers.Contract(contractAddress, Triplets, signer);
    console.log(contract);
    let promises = [];
    let uriPrefix = await contract.uriPrefix()
    let tripletsJSON = [];
    let tripletsJSON_O = new Map();
    console.log(uriPrefix);
}

export async function checkConnection() {
    var web3;

    if (window.ethereum) {
        console.log("HERE");
        web3 = new ethers.providers.Web3Provider(window.ethereum);
    } else if (window.web3) {
        web3 = new ethers.providers.Web3Provider(window.ethereum.Web3Provider)
    };
    console.log(web3);
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
    // Check if user is already connected by retrieving the accounts
    console.log(accounts != undefined);
    return (accounts != undefined)
}


export async function isUnlocked() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let unlocked;
    console.log("isUnlocked?");
    
    try {
        const accounts = await provider.listAccounts();
        console.log(accounts);
        unlocked = accounts.length > 0;
        console.log(accounts.length);
        console.log(unlocked);
    } catch (e) {
        unlocked = false;
    }
    return unlocked;
}

export async function tokenUri() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);

    // MetaMask requires requesting permission to connect users accounts
    //await provider.send("eth_requestAccounts", []);
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    console.log(signer);
    console.log(Triplets);
    
    const contractAddress = '0x9fcEF82DAe1a4144cc327237eDb9aC928D1eC1Df';
    
    // get the smart contract
    const contract = new ethers.Contract(contractAddress, Triplets, signer);
    console.log(contract);
    const uri = await contract.tokenURI(3);
    console.log(uri);
    alert(uri);
}

// window.wtf = () => {
//     const uri = await contract.tokenURI(tokenId);
//     alert(uri); 
// }