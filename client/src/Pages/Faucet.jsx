import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import abi from '../contract.json';
import {Button} from "@material-tailwind/react";

export const ClaimToken = () => {
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
        <div className='flex flex-col justify-center items-center mt-20'>
        <img src='https://101blockchains.com/wp-content/uploads/2022/09/Crypto-Faucets-150x150.png' className='w-80 h-80'/>
        <Button onClick={callContractFunction} className='flex items-center justify-center'>
            Get Tokens
        </Button>
        </div>
    );
};