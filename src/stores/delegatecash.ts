import { writable } from 'svelte/store';
import { DelegateCash } from "delegatecash";
import type { ethers } from "ethers";

function createDelegateCashStore() {
  
  const defaultDelegateCash = new DelegateCash();

  const { subscribe, set, update } = writable(defaultDelegateCash);

  return {
    subscribe,
    setProvider: (provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider) => {
      update(() => new DelegateCash(provider))
    },
    reset: () => set(defaultDelegateCash),
  };
}

export const delegatecash = createDelegateCashStore();
