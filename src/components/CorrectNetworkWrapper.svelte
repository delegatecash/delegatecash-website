<script lang="ts">
  import { delegatecash } from '~/stores/delegatecash';
  import { wallet } from '~/stores/wallet';
  import { modals } from '~/stores/modals';

  let error: string;
  $: error;

  delegatecash.subscribe(async dc => {
    try {
      await dc.getDelegatesForAll('0x0000000000000000000000000000000000000001');
      error = null;
    } catch (err) {
      if (err.message.includes('revert')) error = 'network_not_supported';
      else error = 'browser_not_supported';
    }
  });
</script>

{#if error === undefined}
  &nbsp;
{:else if !$wallet.isConnected || error !== 'network_not_supported'}
  <slot />
{:else}
  <p class="font-bold">This network is not yet supported.</p>
  <button on:click={() => modals.setNetworkSwitcher(true)}>
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
