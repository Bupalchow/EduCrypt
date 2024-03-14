import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import abi from '../contract.json';

const ViewBalance = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts) => setAccount(accounts[0]))
        .catch((error) => console.error(error));
    } else {
      console.log('Please install MetaMask!');
    }
  }, []);

  const callViewFunction = async () => {
    if (web3 && account) {
      const contract = new web3.eth.Contract(abi, '0xEfAcb047Adf3036E42cb70C7ADff977B4F56D61F');
      const result = await contract.methods.balanceOf(account).call();
      const balance = web3.utils.fromWei(result, 'ether');
      setBalance(balance);
    }
  };

  useEffect(() => {
    callViewFunction();
  }, [web3, account]);

  return (
    <div className='bg-white text-black py-2 px-5 mr-6 rounded-xl' onClick={callViewFunction}>
      {balance} ECR
    </div>
  );
};

export default ViewBalance;
