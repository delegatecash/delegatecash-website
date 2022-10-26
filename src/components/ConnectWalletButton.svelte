<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import {
    truncateWallet,
    connectWallet,
    isConnected,
    getCurrentWallet,
    getEnsName,
  } from '~/utils';
  import Button from '~/design-system/Button.svelte';

  import { getProvider } from 'delegatecash/utils';
  import { findNetworkByChainId } from '~/components/NetworkSwitcherModal/networks';

  const dispatch = createEventDispatcher();

  $: connected = false;
  $: wallet = null;
  $: ensName = null;
  $: currentNetwork = null;
  $: foundNetwork = findNetworkByChainId(currentNetwork?.chainId);

  onMount(async () => {
    [connected, wallet] = await Promise.all([isConnected(), getCurrentWallet()]);
    [ensName, currentNetwork] = await Promise.all([getEnsName(wallet), getProvider().getNetwork()]);
  });
</script>

{#if connected}
  {#if currentNetwork}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => dispatch('walletClick')}>
      <p title={wallet}>
        {#if ensName}
          {ensName}
        {:else}
          {truncateWallet(wallet, 4, 4)}
        {/if}
      </p>
      <span>
        {#if foundNetwork}
          {foundNetwork.chainName}
        {:else}
          {currentNetwork?.name.capitalize()}
        {/if}
      </span>
    </div>
  {/if}
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
