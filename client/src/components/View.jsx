import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../contract.json'; 

const ViewBalance = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
            const signer = provider.getSigner();
            setSigner(signer);
            setAddress(window.ethereum.selectedAddress);
        } else {
            console.log('Please install MetaMask!');
        }
    }, []);

    const callViewFunction = async () => {
        if (provider && signer && address) {
            const contract = new ethers.Contract('0xEfAcb047Adf3036E42cb70C7ADff977B4F56D61F', abi, signer);
            const result = await contract.balanceOf(address);
            const balance = ethers.utils.formatEther(result);
            setBalance(balance);
        }
    };

    useEffect(() => {
        callViewFunction();
    }, [provider, signer, address]);

    return (
        <div className='bg-white text-black py-2 px-5 mr-6 rounded-xl' onClick={callViewFunction}>
            {balance}ECR
        </div>
    );
};

export default ViewBalance;