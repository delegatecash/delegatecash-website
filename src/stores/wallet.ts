import { writable } from 'svelte/store';

function createWalletStore() {

  const defaultObj = {
    isConnected: false,
    currentWallet: null,
    showNetworkSwitcher: false
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
    setNetworkSwitcher: (showNetworkSwitcher: boolean) => update(obj => {
      return {
        ...obj,
        showNetworkSwitcher
      }
    }),
		reset: () => set(defaultObj)
	};
}

export const wallet = createWalletStore();