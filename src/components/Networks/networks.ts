interface NetworkType {
  chainName: string,
  chainId: number,
  rpcUrls: string[],
  nativeCurrency: { name: string, symbol: string, decimals: number },
  testnet: boolean
}

export const networks: NetworkType[] = [
  {
    chainName: "Ethereum",
    chainId: 1,
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    testnet: false
  },
  {
    chainName: "Goerli",
    chainId: 5,
    rpcUrls: ["https://goerli.infura.io/v3/"],
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    testnet: true
  },
  {
    chainName: "Polygon",
    chainId: 137,
    rpcUrls: ["https://polygon-rpc.com/"],
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    testnet: false
  },
  {
    chainName: "Mumbai",
    chainId: 80001,
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
    nativeCurrency: { name: "tMATIC", symbol: "tMATIC", decimals: 18 },
    testnet: true
  },
  {
    chainName: "Celo",
    chainId: 42220,
    rpcUrls: ["https://forno.celo.org"],
    nativeCurrency: { name: "Celo", symbol: "CELO", decimals: 18 },
    testnet: false
  },
  {
    chainName: "Alfajores",
    chainId: 44787,
    rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
    nativeCurrency: { name: "Celo", symbol: "CELO", decimals: 18 },
    testnet: true
  }
]

export const findNetworkByChainId = (chainId) => {
  return networks.find(network => network.chainId == chainId);
}