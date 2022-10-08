declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MARKET_ADDRESS: string;
    }
  }
  interface Window {
    ethereum: import('ethers').providers.ExternalProvider
  }
}

export {};