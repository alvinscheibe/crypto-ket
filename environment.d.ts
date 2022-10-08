declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MARKET_ADDRESS: string;
    }
  }
}

export {};