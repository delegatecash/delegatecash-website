import { writable } from 'svelte/store';
import { ethers } from "ethers";

function createWalletStore() {
  const defaultObj = {
    isConnected: false,
    currentWallet: null as string,
    currentChainId: null as number,
    provider: ethers.providers.Web3Provider
  };

  const { subscribe, set, update } = writable(defaultObj);

  return {
    subscribe,
    setConnectionStatus: (isConnected, currentWallet, currentChainId, provider) => {
      return update(obj => {
        return {
          ...obj,
          isConnected,
          currentWallet: currentWallet?.toLowerCase(),
          currentChainId,
          provider
        };
      });
    },
    reset: () => set(defaultObj),
  };
}

export const wallet = createWalletStore();
