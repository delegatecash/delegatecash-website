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
  title="5 of 5"
  position={windowWidth < 768 ? 'top' : 'left'}
>
  <p>Click <strong>Submit Delegation</strong> to submit your transaction!</p>
</WalkthroughItem>

<style lang="postcss">
  p {
    @apply mb-2 text-left;

    &:last-child {
      @apply mb-0;
    }
  }
</style>
