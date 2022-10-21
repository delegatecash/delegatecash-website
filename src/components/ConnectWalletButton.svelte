<script>
  import { createEventDispatcher } from 'svelte';
  import {
    truncateWallet,
    connectWallet,
    isConnected,
    getCurrentWallet,
    getEnsName,
  } from '~/utils';
  import Button from '~/design-system/Button.svelte';

  import { getProvider } from 'delegatecash/utils';
  import { findNetworkByChainId } from '~/components/Networks/networks';

  const dispatch = createEventDispatcher();

  $: connected = false;
  $: wallet = null;
  $: ensName = null;
  $: currentNetwork = null;
  $: foundNetwork = findNetworkByChainId(currentNetwork?.chainId);

  const initialLoad = async () => {
    [connected, wallet] = await Promise.all([isConnected(), getCurrentWallet()]);
    [ensName, currentNetwork] = await Promise.all([getEnsName(wallet), getProvider().getNetwork()]);
  };

  initialLoad();
</script>

{#if connected}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => dispatch('walletClick')}>
    <p title={wallet}>
      {#if ensName}
        {ensName}
      {:else}
        {truncateWallet(wallet, 4, 4)}
      {/if}
    </p>
    {#if foundNetwork}<span>{foundNetwork.chainName}</span>{/if}
  </div>
{:else}
  <Button on:click={() => connectWallet()}>Connect Wallet</Button>
{/if}

<style lang="postcss">
  div {
    @apply cursor-pointer;
    &:hover {
      @apply opacity-80;
    }
  }
  p {
    @apply font-normal inline;
    color: #094780;
  }

  span {
    @apply rounded-sm px-1 py-0;
    font-size: 10px;
    line-height: 12px;
    height: 15px;
    background-color: #fafafa;
    border: 1px solid #ebecef;
  }
</style>
