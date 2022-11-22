<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import WalkthroughItem from '~/design-system/WalkthroughItem.svelte';

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

<WalkthroughItem width={null} target="main_widget_container" title="4 of 5" position="left">
  <p>
    In the <strong>Delegate Wallet</strong> input field, type in your hot wallet.
  </p>
</WalkthroughItem>

<style lang="postcss">
  p {
    @apply mb-2 text-left;

    &:last-child {
      @apply mb-0;
    }
  }
</style>
