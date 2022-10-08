import { createContext, ReactNode, useEffect, useState } from 'react';

interface NFTContextProps {
  children: ReactNode;
}

type NFTContextData = {
  nftCurrency: string;
  connectWallet: () => void;
  currentAccount: string;
};

export const NFTContext = createContext({} as NFTContextData);

export const NFTProvider = ({ children }: NFTContextProps) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const nftCurrency = 'ETH';

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum)
      return alert('Please install MetaMask');

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
      return alert('Please install MetaMask');

    if (window.ethereum.request) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      setCurrentAccount(accounts[0]);

      window.location.reload();
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <NFTContext.Provider value={{ nftCurrency, connectWallet, currentAccount }}>
      {children}
    </NFTContext.Provider>
  );
};