import { writable } from 'svelte/store';

function createIntialWalkthroughStore() {
  const defaultObj = {
    isActive: false,
    activeItem: null
  };

  const { subscribe, set, update } = writable(defaultObj);

  return {
    subscribe,
    turnOn: () => {
      return update(obj => {
        return {
          ...obj,
          isActive: true
        };
      });
    },
    setWalkthroughItem: (activeItem) => {
      return update(obj => {
        return {
          ...obj,
          activeItem
        };
      });
    },
    reset: () => set(defaultObj),
  };
}

export const initialWalkthrough = createIntialWalkthroughStore();
