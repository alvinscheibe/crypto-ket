declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MARKET_ADDRESS: string;
      NEXT_PUBLIC_INFURA_PROJECT_ID: string;
      NEXT_PUBLIC_INFURA_API_KEY_SECRET: string;
    }
  }
  interface Window {
    ethereum: import('ethers').providers.ExternalProvider
  }
}

export {};