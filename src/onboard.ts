import Onboard from '@web3-onboard/core';
import walletConnectModule from '@web3-onboard/walletconnect';
import injectedModule from '@web3-onboard/injected-wallets';
import { networks } from '~/components/NetworkSwitcherModal/networks';

const injected = injectedModule();

const walletConnect = walletConnectModule({
  bridge: 'https://bridge.walletconnect.org',
  qrcodeModalOptions: {
    mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar'],
  },
  connectFirstChainId: true,
});

const appMetadata = {
  name: 'delegate.cash',
  icon: '/images/logo.svg',
  logo: '/images/logo.svg',
  description: 'My app using Onboard',
  recommendedInjectedWallets: [
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
    { name: 'MetaMask', url: 'https://metamask.io' },
  ],
};

const onboard = Onboard({
  wallets: [injected, walletConnect],
  chains: networks.map(chain => {
    return {
      id: chain.chainId,
      token: chain.nativeCurrency.symbol,
      label: chain.chainName,
      rpcUrl: chain.rpcUrls[0],
    };
  }),
  appMetadata,
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
});

export default onboard;