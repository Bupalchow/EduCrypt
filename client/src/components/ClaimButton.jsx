import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import abi from '../contract.json';

let web3;
let contract;

const ClaimButton = () => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
      web3 = window.web3;

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = abi.networks[networkId];
      if(networkData) {
        contract = new web3.eth.Contract(abi.abi, );
      } else {
        window.alert('Smart contract not deployed to detected network.');
      }
    };

    initWeb3();
  }, []);

  const claimToken = async () => {
    await contract.methods.claimToken().send({ from: account });
  };

  return (
    <button onClick={claimToken}>
      Claim Token
    </button>
  );
};

export default ClaimButton;