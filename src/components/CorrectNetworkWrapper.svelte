<script>
  import { delegatecash } from '~/stores/delegatecash';
  import { wallet } from '~/stores/wallet';

  $: error = null;

  delegatecash.subscribe(async dc => {
    try {
      error = await dc.getDelegatesForAll('0x0000000000000000000000000000000000000001');
    } catch (err) {
      if (err.message.includes('revert')) error = 'network_not_supported';
      else error = 'browser_not_supported';
    }
  });
</script>

{#if error === null}
  &nbsp;
{:else if !$wallet.isConnected || error !== 'network_not_supported'}
  <slot />
{:else}
  <p class="font-bold">This network is not yet supported.</p>
  <button on:click={() => wallet.setNetworkSwitcher(true)}>
    Click here to choose a compatable network
  </button>
{/if}

<style lang="postcss">
  button {
    @apply text-sm;
    color: #094780;

    &:hover {
      @apply opacity-80;
    }
  }
</style>
