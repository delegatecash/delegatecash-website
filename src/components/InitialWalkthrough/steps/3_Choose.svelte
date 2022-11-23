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
  let windowWidth = window.innerWidth;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<WalkthroughItem
  width={null}
  target="main_widget_container"
  title="3 of 5"
  position={windowWidth < 768 ? 'top' : 'left'}
>
  <p>
    It's not uncommon to want to only allow a certain contract to interact with your wallet but for
    this example, we'll be delegating your entire wallet in it's entirety.
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
