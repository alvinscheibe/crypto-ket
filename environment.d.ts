declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MARKET_ADDRESS: string;
    }
  }
}

export {};