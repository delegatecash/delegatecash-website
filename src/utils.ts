import { get } from 'svelte/store';
import { transaction } from '~/stores/transaction';
import { wallet } from '~/stores/wallet';
import { findNetworkByChainId } from '~/components/NetworkSwitcherModal/networks';
import type { RegistryRow } from "~/components/RegistryTableByWallet/types";
import { delegatecash } from './stores/delegatecash';
import onboard from "~/onboard";

Object.defineProperty(String.prototype, 'capitalize', {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

let ethereum;
// @ts-ignore
if (window.ethereum) ethereum = window.ethereum;

export const truncateWallet = (wallet, left = 8, right = 8) => {
  wallet = String(wallet);
  if (wallet.length <= 15) return wallet;
  return wallet.substr(0, left) + '...' + wallet.substr(wallet.length - right);
};

export const getWallets = async () => {
  try {
    const currentState = onboard.state.get();
    const wallets = currentState.wallets;
    return wallets.map(wallet => wallet.accounts[0].address);
  } 
  catch {
    return [];
  }
};

export const getCurrentWallet = async () => {
  try {
    const wallets = await getWallets();
    return wallets[0] || null;
  } catch {
    return null;
  }
};

export const isConnected = async () => {
  try {
    const wallets = await getWallets();
    return wallets.length > 0;
  } catch {
    return false;
  }
};

export let submitTransaction = async (
  pendingMessage: string,
  recieptMessage: string,
  func: Function,
  parameters: any[] = [],
) => {
  try {
    transaction.reset();
    transaction.setModal(true);
    transaction.setMessage(pendingMessage);
    
    const [dc, walletStore, pendingTransaction] = await Promise.all([await get(delegatecash), await get(wallet), await func.apply(this, parameters)]);
    
    dc.provider
      .waitForTransaction(pendingTransaction.hash, 1, 150000)
      .then(async reciept => {
        const explorerUrl = findNetworkByChainId(walletStore.currentChainId).explorerUrl;
        transaction.setTitle('Transaction Complete');
        transaction.setMessage(recieptMessage);
        transaction.setTransactionUrl(`${explorerUrl}/tx/${reciept.transactionHash}`);
      });
  } catch {
    transaction.reset();
    transaction.setModal(false);
  }
};

export const getDelegations = async (wallet) => {
  try {

    const dc = await get(delegatecash);    
    const delegations: RegistryRow[] = [];

    const [delegatesForAll, contractLevelDelegations, delegatesForContract] = await Promise.all([
      await dc.getDelegatesForAll(wallet),
      await dc.getContractLevelDelegations(wallet),
      await dc.getTokenLevelDelegations(wallet),
    ]);

    delegatesForAll.forEach(delegate => {
      delegations.push({ type: 'ALL', delegate });
    });

    contractLevelDelegations.forEach(item => {
      delegations.push({ type: 'CONTRACT', delegate: item.delegate, contract: item.contract });
    });

    delegatesForContract.forEach(item => {
      delegations.push({
        type: 'TOKEN',
        delegate: item.delegate,
        contract: item.contract,
        tokenId: item.tokenId,
      });
    });

    return delegations;
  }
  catch(err) {
    console.log(err);
    return [];
  }
}

export const clickOutsideHandler = node => {
  const handleClick = event => {
    if (node && !node.contains(event.target) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('clickOutside', { detail: event.target }));
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
};