<script>
  import { onMount } from 'svelte';
  import { isConnected, getCurrentWallet } from '~/utils';
  import { wallet } from '~/stores/wallet';
  import { transaction } from '~/stores/transaction';
  import Header from '~/components/Header.svelte';
  import TransactionModal from '~/components/TransactionModal.svelte';
  import NetworkSwitcherModal from '~/components/NetworkSwitcherModal/NetworkSwitcherModal.svelte';
  import CorrectNetworkWrapper from '~/components/CorrectNetworkWrapper.svelte';

  const onEthereumChange = () => {
    //clear wallet signature if account is changed
    localStorage.clear();
    window.location.reload();
  };

  onMount(async () => {
    // @ts-ignore
    window.ethereum?.on('accountsChanged', onEthereumChange);
    // @ts-ignore
    window.ethereum?.on('chainChanged', onEthereumChange);

    //watch for tamper in wallet signature
    window.addEventListener('storage', e => {
      if (e.key === 'signature' && e.oldValue !== null) window.location.reload();
    });

    const connected = await isConnected();
    if (connected) {
      const currentWallet = await getCurrentWallet();
      wallet.setConnectionStatus(connected, currentWallet);
    }
  });
</script>

<Header />

<div class="container mx-auto px-4 text-center">
  <h1 class="text-3xl font-bold">Delegation Registry</h1>
  <p class="mt-3 mb-10">
    Keep your vaulted NFTs safe. Claim airdrops, prove ownership, and more from your hot wallet.
  </p>

  <CorrectNetworkWrapper>
    <slot />
  </CorrectNetworkWrapper>
</div>

{#if $transaction.showModal}
  <TransactionModal
    title={$transaction.title}
    message={$transaction.message}
    transactionUrl={$transaction.transactionUrl}
    on:close={() => location.reload()}
  />
{/if}

{#if $wallet.showNetworkSwitcher}
  <NetworkSwitcherModal on:close={() => wallet.setNetworkSwitcher(false)} />
{/if}
