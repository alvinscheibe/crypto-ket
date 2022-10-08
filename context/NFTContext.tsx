import { createContext, ReactNode } from 'react';

interface NFTContextProps {
  children: ReactNode;
}

type NFTContextData = {
  nftCurrency: string;
};

export const NFTContext = createContext({} as NFTContextData);

export const NFTProvider = ({ children }: NFTContextProps) => {
  const nftCurrency = 'ETH';

  return (
    <NFTContext.Provider value={{ nftCurrency }}>
      {children}
    </NFTContext.Provider>
  );
};