<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import BlurContainer from '~/design-system/BlurContainer.svelte';
  import Switch from '~/design-system/inputs/Switch.svelte';
  import Icon from '~/design-system/icon/Icon.svelte';
  import { networks } from './networks';
  import { switchNetwork } from '~/utils';

  const dispatch = createEventDispatcher();

  export let isVisible;
  export let currentNetworkChainId;

  $: filteredNetworks = networks.filter(network => network.testnet === showTestNetworks);
  $: showTestNetworks =
    networks.find(network => currentNetworkChainId == network.chainId)?.testnet || false;

  const changeNetwork = async network => {
    await switchNetwork(network);
  };
</script>

{#if isVisible}
  <BlurContainer on:click={() => dispatch('close')}>
    <section>
      <button class="hover:text-slate-600" on:click={() => dispatch('close')}>
        <Icon name="x" />
      </button>
      <p>Change Network</p>
      <ul>
        {#each filteredNetworks as network}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li
            class:opacity-60={currentNetworkChainId === network.chainId}
            on:click={() => changeNetwork(network)}
          >
            {network.chainName}
            {#if currentNetworkChainId === network.chainId}<span>(Active)</span>{/if}
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
{/if}

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
    @apply fixed text-left top-2 right-2 w-56 bg-white rounded-lg shadow-lg p-6 font-semibold text-slate-900;
  }

  button {
    @apply absolute top-8 right-5 w-3 h-3 flex items-center justify-center text-slate-500;
  }
</style>
