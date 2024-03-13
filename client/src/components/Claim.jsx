import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../contract.json'; // Import the ABI of your contract

export const Claim5Token = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
            setSigner(provider.getSigner());
        } else {
            console.log('Please install MetaMask!');
        }
    }, []);

    const callContractFunction = async () => {
        if (provider && signer) {
            const contract = new ethers.Contract('0xEfAcb047Adf3036E42cb70C7ADff977B4F56D61F', abi, signer);
            await contract.claim5Token();
        }
    };

    return (
        <button onClick={callContractFunction}>
            Submit And Claim 5 Tokens
        </button>
    );
};
export const Claim1Token = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);

    useEffect(() => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(provider);
            setSigner(provider.getSigner());
        } else {
            console.log('Please install MetaMask!');
        }
    }, []);

    const callContractFunction = async () => {
        if (provider && signer) {
            const contract = new ethers.Contract('0xEfAcb047Adf3036E42cb70C7ADff977B4F56D61F', abi, signer);
            await contract.claim1Token();
        }
    };

    return (
        <button onClick={callContractFunction}>
            Submit And Claim a Token
        </button>
    );
};