export interface NetworkType {
  chainName: string;
  chainId: number;
  rpcUrls: string[];
  nativeCurrency: { name: string; symbol: string; decimals: number };
  testnet: boolean;
  explorerUrl: string;
}

export const networks: NetworkType[] = [
  {
    chainName: 'Ethereum',
    chainId: 1,
    rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    testnet: false,
    explorerUrl: 'https://etherscan.io',
  },
  {
    chainName: 'Goerli',
    chainId: 5,
    rpcUrls: ['https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    testnet: true,
    explorerUrl: 'https://goerli.etherscan.io',
  },
  {
    chainName: 'Polygon',
    chainId: 137,
    rpcUrls: ['https://polygon-rpc.com/'],
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    testnet: false,
    explorerUrl: 'https://polygonscan.com',
  },
  {
    chainName: 'Mumbai',
    chainId: 80001,
    rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
    nativeCurrency: { name: 'tMATIC', symbol: 'tMATIC', decimals: 18 },
    testnet: true,
    explorerUrl: 'https://mumbai.polygonscan.com',
  },
  {
    chainName: 'Optimism',
    chainId: 10,
    rpcUrls: ['https://mainnet.optimism.io'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    testnet: false,
    explorerUrl: 'https://optimistic.etherscan.io',
  },
  {
    chainName: 'Optimism (Goerli)',
    chainId: 420,
    rpcUrls: ['https://goerli.optimism.io'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    testnet: true,
    explorerUrl: 'https://goerli-optimism.etherscan.io',
  },
  {
    chainName: 'Celo',
    chainId: 42220,
    rpcUrls: ['https://forno.celo.org'],
    nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
    testnet: false,
    explorerUrl: 'https://explorer.celo.org/mainnet',
  },
  {
    chainName: 'Alfajores',
    chainId: 44787,
    rpcUrls: ['https://alfajores-forno.celo-testnet.org'],
    nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
    testnet: true,
    explorerUrl: 'https://explorer.celo.org/alfajores',
  },
  {
    chainName: 'Avalanche',
    chainId: 43114,
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    testnet: false,
    explorerUrl: 'https://snowtrace.io',
  },
  {
    chainName: 'Avalanche (Fuji)',
    chainId: 43113,
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    nativeCurrency: { name: 'AVAX', symbol: 'AVAX', decimals: 18 },
    testnet: true,
    explorerUrl: 'https://testnet.snowtrace.io',
  },
  {
    chainName: 'Fantom',
    chainId: 250,
    rpcUrls: ['https://rpc.fantom.network'],
    nativeCurrency: { name: 'FTM', symbol: 'FTM', decimals: 18 },
    testnet: false,
    explorerUrl: 'https://ftmscan.com',
  },
  {
    chainName: 'Fantom (Testnet)',
    chainId: 4002,
    rpcUrls: ['https://rpc.testnet.fantom.network'],
    nativeCurrency: { name: 'FTM', symbol: 'FTM', decimals: 18 },
    testnet: true,
    explorerUrl: 'https://testnet.ftmscan.com',
  },
  {
    chainName: 'Arbitrum',
    chainId: 42161,
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    testnet: false,
    explorerUrl: 'https://arbiscan.io',
  },
  {
    chainName: 'Arbitrum (Georli)',
    chainId: 421613,
    rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
    nativeCurrency: { name: 'AGOR', symbol: 'AGOR', decimals: 18 },
    testnet: true,
    explorerUrl: 'https://goerli.arbiscan.io',
  },
];

export const findNetworkByChainId = (chainId: number) => {
  return networks.find(network => network.chainId == chainId);
};
