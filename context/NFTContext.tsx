import { createContext, ReactNode, useEffect, useState } from 'react';
import { client } from '../lib/ipfs/client';
import { NextRouter } from 'next/router';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { MarketAddress, MarketAddressABI } from './constants';
import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/abstract-provider';
import axios from 'axios';
import { NFTProps } from '../pages/nft-details';

interface NFTContextProps {
  children: ReactNode;
}

type NFTContextData = {
  nftCurrency: string;
  connectWallet: () => void;
  currentAccount: string;
  uploadToIPFS: (file: any) => Promise<string|undefined>;
  createNFT: (formInput: FormInput, fileUrl: string, router: NextRouter) => void;
  fetchNFTs: () => Promise<ItemMetadataProps[]>;
  fetchMyNFTsOrListedNFTs: (type: string) => Promise<ItemMetadataProps[]>;
  buyNFT: (nft: NFTProps) => void;
};

type FormInput = {
  name: string;
  description: string;
  price: string;
};

type NFTItemProps = {
  tokenId: {
    toNumber: () => number;
  },
  seller: string;
  owner: string;
  price: {
    toString: () => string;
  };
};

type ResponseMetadataProps = {
  name: string;
  description: string;
  image: string;
};

export type ItemMetadataProps = {
  price: string;
  tokenId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
  tokenURI: string;
};

const fetchContract = (signerOrProvider: Signer | Provider) => new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTContext = createContext({} as NFTContextData);

export const NFTProvider = ({ children }: NFTContextProps) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const nftCurrency = 'ETH';

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum)
      return /*alert('Please install MetaMask')*/;

    if (window.ethereum.request) {
      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });

      if (accounts.length)
        setCurrentAccount(accounts[0]);
      else
        console.log('No accounts found.');
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum)
      return /*alert('Please install MetaMask')*/;

    if (window.ethereum.request) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      setCurrentAccount(accounts[0]);

      window.location.reload();
    }
  };

  const uploadToIPFS = async (file: any): Promise<string|undefined> => {
    try {
      const added = await client.add({
        content: file
      });

      return `https://ipfs.io/ipfs/${added.path}`;
    } catch (error) {
      console.log('Error uploading image to IPFS');
    }
  };

  const createNFT = async (formInput: FormInput, fileUrl: string, router: NextRouter) => {
    const { name, description, price } = formInput;

    if (!name || !description || !price || !fileUrl) return;

    const data = JSON.stringify({
      name,
      description,
      image: fileUrl
    });

    try {
      const added = await client.add(data);
      const url = `https://ipfs.io/ipfs/${added.path}`;

      await createSale(url, price);

      await router.push('/');
    } catch (error) {
      console.log('Error uploading file to IPFS', error);
    }
  };

  const createSale = async (url: string, formInputPrice: string, isReselling: boolean = false, id?: string) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const price = ethers.utils.parseUnits(formInputPrice, 'ether');
    const contract = await fetchContract(signer);
    const listingPrice = await contract.getListingPrice();
    const transaction = await contract.createToken(url, price, {
      value: listingPrice.toString()
    });

    await transaction.wait();
  };

  const fetchNFTs = async (): Promise<ItemMetadataProps[]> => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);
    console.log(contract);
    const data = await contract.fetchMarketItems();

    const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice }: NFTItemProps) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const {
        data: {
          name, description, image
        }
      } = await axios.get<ResponseMetadataProps>(tokenURI);
      const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ether');

      const itemMetadata: ItemMetadataProps = {
        price,
        tokenId: tokenId.toNumber(),
        seller,
        owner,
        image,
        name,
        description,
        tokenURI
      };

      return itemMetadata;
    }));

    return items;
  };

  const fetchMyNFTsOrListedNFTs = async (type: string): Promise<ItemMetadataProps[]> => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    const data = type === 'fetchItemsListed'?
      await contract.fetchItemsListed() :
      await contract.fetchMyNFTs();

    const items = await Promise.all(data.map(async ({ tokenId, seller, owner, price: unformattedPrice }: NFTItemProps) => {
      const tokenURI = await contract.tokenURI(tokenId);
      const {
        data: {
          name, description, image
        }
      } = await axios.get<ResponseMetadataProps>(tokenURI);
      const price = ethers.utils.formatUnits(unformattedPrice.toString(), 'ether');

      const itemMetadata: ItemMetadataProps = {
        price,
        tokenId: tokenId.toNumber(),
        seller,
        owner,
        image,
        name,
        description,
        tokenURI
      };

      return itemMetadata;
    }));

    return items;
  };

  const buyNFT = async (nft: NFTProps) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    console.log(price);

    const transaction = await contract.createMarketSale(nft.tokenId, { value: price });

    await transaction.wait();
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount, uploadToIPFS, createNFT, fetchNFTs, fetchMyNFTsOrListedNFTs, buyNFT }}>
      {children}
    </NFTContext.Provider>
  );
};