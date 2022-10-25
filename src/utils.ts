import { getProvider } from "delegatecash/utils";
import { ethers } from "ethers";

let ethereum;
// @ts-ignore
if(window.ethereum) ethereum = window.ethereum;

export const truncateWallet = (wallet, left = 8, right = 8) => {
  wallet = String(wallet);
  if (wallet.length <= 15) return wallet;
  return wallet.substr(0, left) + '...' + wallet.substr(wallet.length - right);
};

export const connectWallet = async () => {
  try {
      return await ethereum.request({ method: 'eth_requestAccounts' });
  }
  catch { return; }
}

export const getWallets = async () => {
  try {
    return await ethereum.request({ method: 'eth_accounts' });
  }
  catch { return []; }
}

export const getCurrentWallet = async () => {
  try {
    const wallets = await getWallets();
    return wallets[0] || null;
  }
  catch { return null; }
}

export const isConnected = async () => {
  try {
    const wallets = await getWallets();
    return wallets.length > 0;
  }
  catch { return false; }
}

export const getEnsName = async (address) => {
  try {
    return await getProvider().lookupAddress(address);
  }
  catch { return null; }
}

export const switchNetwork = async (params) => {

  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: ethers.utils.hexValue(params.chainId) }],
    });
  } catch (switchError) {

    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {

        params.chainId = ethers.utils.hexValue(params.chainId);
        delete params.testnet;
        delete params.explorerUrl;

        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [params],
        });
      } catch (addError) {
        // handle "add" error
        return;
      }
    }

    // handle other "switch" errors
    return;
  }
}