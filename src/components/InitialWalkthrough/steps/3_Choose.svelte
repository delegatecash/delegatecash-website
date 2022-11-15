<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import WalkthroughItem from '~/design-system/WalkthroughItem.svelte';
  import PulsingCircle from '~/design-system/PulsingCircle.svelte';

  onMount(() => {
    const container = getContainer();
    container.style.position = 'relative';
    container.style.zIndex = '31';
  });

  onDestroy(() => {
    const container = getContainer();
    container.style.position = 'static';
    container.style.zIndex = null;
  });

  const getContainer = () => document.getElementById('main_widget_container');
</script>

<PulsingCircle top={100} left={150} />

<WalkthroughItem width={null} target="main_widget_container" title="3 of 5" position="top">
  <p>
    It's not uncommon to want to only allow a certain contract to interact with your wallet but for
    this example, we'll be delegating your entire wallet carte-blanche.
  </p>
  <p>Select the <strong>Wallet</strong> tab to continue.</p>
</WalkthroughItem>

<style lang="postcss">
  p {
    @apply mb-2 text-left;

    &:last-child {
      @apply mb-0;
    }
  }
</style>
