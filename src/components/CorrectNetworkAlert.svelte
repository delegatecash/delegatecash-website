<script lang="ts">
  import { wallet } from '~/stores/wallet';
  import { modals } from '~/stores/modals';
  import { networks } from '~/components/Modals/NetworkSwitcherModal/networks';

  let error: string;
  $: error = null;

  wallet.subscribe(async w => {
    try {
      if (w.isConnected) {
        const foundNetwork = networks.find(n => n.chainId === w.currentChainId);
        if (!foundNetwork) error = 'network_not_supportd';
        else error = null;
      } else error = null;
    } catch (err) {}
  });
</script>

{#if error?.length > 0}
  <div on:click={() => modals.setNetworkSwitcher(true)}>
    This network is not yet supported. Click <strong>here</strong> to choose a compatible network.
  </div>
{/if}

<style lang="postcss">
  div {
    background-color: #fff5f5;
    color: #d15f5e;
    @apply p-2 text-center text-sm cursor-pointer;

    &:hover {
      opacity: 0.9;
    }
  }
</style>
