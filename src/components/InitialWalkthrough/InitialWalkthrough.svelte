<script lang="ts">
  import { get } from 'svelte/store';
  import { initialWalkthrough } from '~/stores/initialWalkthrough';
  import { wallet } from '~/stores/wallet';
  import BlurContainer from '~/design-system/BlurContainer.svelte';
  import Step1_ConnectWallet from './steps/1_ConnectWallet.svelte';
  import Step2_CheckWallet from './steps/2_CheckWallet.svelte';
  import Step3_Choose from './steps/3_Choose.svelte';
  import Step4_Choose from './steps/4_Choose.svelte';
  import Step5_Submit from './steps/5_Submit.svelte';

  export let optionValue: number;
  export let isFormValid: boolean;

  initialWalkthrough.subscribe(async wt => {
    const walletStore = await get(wallet);

    // if the initial walkthrough gets activated for first time
    if (wt.isActive && !wt.activeItem) {
      if (!walletStore.isConnected) {
        initialWalkthrough.setWalkthroughItem(1);
      } else if (walletStore.isConnected) {
        initialWalkthrough.setWalkthroughItem(2);
      }
    }
  });

  wallet.subscribe(walletStore => {
    if ($initialWalkthrough.isActive && $initialWalkthrough.activeItem) {
      if (walletStore.isConnected) {
        initialWalkthrough.setWalkthroughItem(2);
      } else {
        initialWalkthrough.setWalkthroughItem(1);
      }
    }
  });
</script>

{#if $initialWalkthrough.isActive}
  <BlurContainer />

  {#if $initialWalkthrough.activeItem === 1}
    <Step1_ConnectWallet />
  {/if}

  {#if $initialWalkthrough.activeItem === 2}
    <Step2_CheckWallet on:next={() => initialWalkthrough.setWalkthroughItem(3)} />
  {/if}

  {#if $initialWalkthrough.activeItem === 3}
    {#if optionValue === 0}
      {#if isFormValid}
        <Step5_Submit />
      {:else}
        <Step4_Choose />
      {/if}
    {:else}
      <Step3_Choose />
    {/if}
  {/if}

  <div>
    <button on:click={() => initialWalkthrough.reset()}>Cancel Walkthrough</button>
  </div>
{/if}

<style lang="postcss">
  div {
    @apply fixed left-1 bottom-5 w-full text-center;
    z-index: 40;
  }

  button {
    @apply inline-block rounded p-1 bg-white px-5;
    color: #0c1822;
  }
</style>
