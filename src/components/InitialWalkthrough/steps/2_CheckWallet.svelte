<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { modals } from '~/stores/modals';
  import WalkthroughItem from '~/design-system/WalkthroughItem.svelte';

  onMount(() => {
    getContainer().style.zIndex = '31';
    modals.setWalletDropdown(true, true);
  });

  onDestroy(() => {
    // getContainer().style.zIndex = null;
    modals.setWalletDropdown(false, true);
  });

  const getContainer = () => document.getElementById('header');
</script>

<WalkthroughItem
  width={300}
  target="current_wallet"
  position="left"
  title="2 of 5"
  showNext
  on:next
>
  <p>
    Make sure you're on the right network and that the wallet listed is your <strong
      >cold wallet</strong
    >.
  </p>
  <p>You can make any changes here in this dropdown.</p>
</WalkthroughItem>

<style lang="postcss">
  p {
    @apply mb-2 text-left;

    &:last-child {
      @apply mb-0;
    }
  }
</style>
