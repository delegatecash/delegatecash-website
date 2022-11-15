<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ethers } from 'ethers';
  import { networks } from './networks';
  import { wallet } from '~/stores/wallet';
  import BlurContainer from '~/design-system/BlurContainer.svelte';
  import Switch from '~/design-system/inputs/Switch.svelte';
  import Icon from '~/design-system/icon/Icon.svelte';
  import onboard from '~/onboard';
  import type { NetworkType } from './networks';

  const dispatch = createEventDispatcher();

  $: filteredNetworks = networks.filter(network => network.testnet === showTestNetworks);
  $: showTestNetworks =
    networks.find(network => $wallet.currentChainId == network.chainId)?.testnet || false;

  const changeNetwork = async (network: NetworkType) => {
    dispatch('close');
    await onboard.setChain({ chainId: ethers.utils.hexValue(network.chainId) });
  };
</script>

<BlurContainer zIndex={31} on:click={() => dispatch('close')}>
  <section>
    <button class="hover:text-slate-600" on:click={() => dispatch('close')}>
      <Icon name="x" />
    </button>
    <p>Change Network</p>
    <ul>
      {#each filteredNetworks as network}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
          class:opacity-60={$wallet.currentChainId === network.chainId}
          on:click={() => changeNetwork(network)}
        >
          {network.chainName}
          {#if $wallet.currentChainId === network.chainId}<span>(Active)</span>{/if}
        </li>
      {/each}
    </ul>
    <div>
      <Switch
        label="Testnets"
        bind:checked={showTestNetworks}
        on:click={() => (showTestNetworks = !showTestNetworks)}
      />
    </div>
  </section>
</BlurContainer>

<style lang="postcss">
  p {
    @apply mb-3;
  }
  ul {
    @apply text-left font-light border-b border-slate-200 pb-5 mb-3;

    li:hover {
      @apply opacity-70 cursor-pointer;
    }
  }
  section {
    @apply fixed text-left top-2 right-2 w-64 bg-white rounded-lg shadow-lg p-6 font-semibold text-slate-900;
  }

  button {
    @apply fixed top-8 right-5 w-3 h-3 flex items-center justify-center text-slate-500;
  }
</style>
