import { writable } from 'svelte/store';

function createTransactionStore() {

  const defaultObj = {
    showModal: false,
    title: "Processing Transaction",
    message: "",
    transactionUrl: null
  }

	const { subscribe, set, update } = writable(defaultObj);
    
	return {
		subscribe,
    setData: (title, message, showModal = false, tx = null) => update(obj => {
      return {
        ...obj,
        title,
        message,
        showModal,
        tx
      }
    }),
    setTitle: (title: string) => update(obj => {
      return {
        ...obj,
        title
      }
    }),
		setMessage: (message: string) => update(obj => {
      return {
        ...obj,
        message
      }
    }),
    setTransactionUrl: (transactionUrl: string) => update(obj => {
      return {
        ...obj,
        transactionUrl
      }
    }),
    setModal: (showModal: boolean) => update(obj => {
      return {
        ...obj,
        showModal
      }
    }),
		reset: () => set(defaultObj)
	};
}

export const transaction = createTransactionStore();

export const setTransactionError = (err) => {
  if (err.code === 4001)
    transaction.setMessage("User denied the transaction");
  else if (err.message.includes('Caller not allowed')) 
    transaction.setMessage("Cannot claim another wallets $CROAKS");
  else if (err.code === 'INSUFFICIENT_FUNDS') 
    transaction.setMessage("Wallet does not have the sufficient funds.");
  else if (err.message.includes('underlying network changed')) 
    transaction.setMessage("Connected to the wrong network, please connect to Mainnet");
  else if (err.code === 'UNPREDICTABLE_GAS_LIMIT') 
    transaction.setMessage("Unable to calculate gas limit, please try again.");
  else
    transaction.setMessage("Wallet not connected. Please connect your wallet.");
}