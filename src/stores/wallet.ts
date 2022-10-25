import { writable } from 'svelte/store';

function createWalletStore() {

  const defaultObj = {
    isConnected: false,
    currentWallet: null
  }

	const { subscribe, set, update } = writable(defaultObj);
    
	return {
		subscribe,
		setConnectionStatus: (isConnected, currentWallet) => update(obj => {
      return {
        ...obj,
        isConnected,
        currentWallet
      }
    }),
		reset: () => set(defaultObj)
	};
}

export const wallet = createWalletStore();