<script>
  import { getDelegatesForAll } from 'delegatecash';
  import { onMount } from 'svelte';
  import { wallet } from '~/stores/wallet';

  $: networkFound = null;

  onMount(async () => {
    try {
      const test = await getDelegatesForAll('0x0000000000000000000000000000000000000001');
      console.log(test);
      if (test) networkFound = true;
    } catch {
      networkFound = false;
    }
  });
</script>

{#if networkFound === null}
  &nbsp;
{:else if networkFound}
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
