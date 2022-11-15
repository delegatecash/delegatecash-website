<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import WalkthroughItem from '~/design-system/WalkthroughItem.svelte';

  onMount(() => {
    getContainer().style.zIndex = '31';
  });

  onDestroy(() => {
    ///delete getContainer().style.zIndex;
  });

  const getContainer = () => document.getElementById('header');
</script>

<WalkthroughItem width={300} target="connect_wallet" title="1 of 5">
  <p>To get started, connect your cold wallet.</p>
  <p />
  <p>
    Your <strong>cold wallet</strong> is where your current valuables are being held. This is what we
    are trying to protect.
  </p>
  <p>Connect your wallet to continue.</p>
</WalkthroughItem>

<style lang="postcss">
  p {
    @apply mb-2 text-left;

    &:last-child {
      @apply mb-0;
    }
  }
</style>
