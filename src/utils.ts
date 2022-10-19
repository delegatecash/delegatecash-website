export const truncateWallet = wallet => {
  wallet = String(wallet);
  if (wallet.length <= 15) return wallet;
  return wallet.substr(0, 8) + '...' + wallet.substr(wallet.length - 8);
};
