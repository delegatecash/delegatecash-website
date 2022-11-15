import { writable } from 'svelte/store';

function createWalletStore() {
  const defaultObj = {
    isConnected: false,
    currentWallet: null as string,
    currentChainId: null as number,
  };

  const { subscribe, set, update } = writable(defaultObj);

  return {
    subscribe,
    setConnectionStatus: (isConnected, currentWallet, currentChainId) => {
      return update(obj => {
        return {
          ...obj,
          isConnected,
          currentWallet: currentWallet?.toLowerCase(),
          currentChainId
        };
      });
    },
    reset: () => set(defaultObj),
  };
}

export const wallet = createWalletStore();
