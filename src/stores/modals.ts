import { writable, get } from 'svelte/store';
import { initialWalkthrough } from "./initialWalkthrough";

function createModalsStore() {
  const defaultObj = {
    showNetworkSwitcher: false,
    showWalletDropdown: false,
  };

  const { subscribe, set, update } = writable(defaultObj);

  return {
    subscribe,
    setNetworkSwitcher: (showNetworkSwitcher: boolean) =>
      update(obj => {
        return {
          ...obj,
          showNetworkSwitcher,
        };
      }),
    toggleWalletDropdown: async () => {
      
      const initialWalkthroughStore = await get(initialWalkthrough);

      //don't close the dropdown if it's being used by the walkthrough
      if(initialWalkthroughStore.activeItem == '2') return;

      update(obj => {
        return {
          ...obj,
          showWalletDropdown: !obj.showWalletDropdown,
        };
      })
    },
    setWalletDropdown: async (showWalletDropdown: boolean, override = false) => {

      const initialWalkthroughStore = await get(initialWalkthrough);

      //don't close the dropdown if it's being used by the walkthrough
      if(initialWalkthroughStore.activeItem == '2' && !override) return;

      return update(obj => {
        return {
          ...obj,
          showWalletDropdown
        };
      });
    },
    reset: () => set(defaultObj),
  };
}

export const modals = createModalsStore();
