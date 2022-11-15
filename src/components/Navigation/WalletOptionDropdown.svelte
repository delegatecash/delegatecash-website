<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { truncateWallet, clickOutsideHandler } from '~/utils';
  import type { AppState } from '@web3-onboard/core';

  export let wallets: AppState['wallets'] = [];
  const dispatch = createEventDispatcher();
</script>

<ul
  id="wallet_dropdown"
  use:clickOutsideHandler
  on:clickOutside={event => {
    if (event.detail?.id !== 'current_wallet') {
      dispatch('clickOutside');
    }
  }}
>
  {#each wallets as wallet, index}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li class:active={index == 0} on:click={() => index !== 0 && dispatch('walletClick', index)}>
      <span class="inline-block w-4 align-middle">{@html wallet.icon}</span>
      <span class="inline-block align-middle">
        {wallet.accounts[0].ens?.name || truncateWallet(wallet.accounts[0].address, 7, 7)}
      </span>
    </li>
  {/each}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <li class="font-normal" on:click={() => dispatch('connectWallet')}>Connect another wallet</li>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <li class="font-normal" on:click={() => dispatch('disconnectWallet', wallets[0])}>
    Disconnect wallet
  </li>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <li class="font-normal" on:click={() => dispatch('networkChange')}>Change Network</li>
</ul>

<style lang="postcss">
  ul {
    background-color: #fff;
    width: 175px;

    @apply z-50 fixed top-10 rounded shadow-lg border border-slate-200;

    li {
      @apply py-1 px-2 border-b border-slate-200;

      &:last-child {
        @apply border-b-0;
      }

      &.active,
      &:hover {
        background-color: #ecf3fa;
      }
    }
  }
</style>
