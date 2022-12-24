<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { findNetworkByChainId } from '~/components/Modals/NetworkSwitcherModal/networks';
  import { wallet } from '~/stores/wallet';
  import { modals } from '~/stores/modals';
  import { delegatecash } from '~/stores/delegatecash';
  import { truncateWallet } from '~/utils';
  import { ethers } from 'ethers';
  import onboard from '~/onboard';
  import Button from '~/design-system/Button.svelte';
  import WalletOptionDropdown from '~/components/ConnectWalletButton/ConnectWalletDropdown.svelte';
  import type { AppState } from '@web3-onboard/core';

  const dispatch = createEventDispatcher();

  let wallets: AppState['wallets'];
  $: wallets = [];

  $: primaryWallet = null;
  $: ensName = null;
  $: currentChainId = null;
  $: foundNetwork = findNetworkByChainId(currentChainId);

  onMount(async () => {
    const walletsSub = onboard.state.select('wallets');

    // Watch for connection changes in wallet or network
    walletsSub.subscribe(walletSubscription => {
      const connectedWallets = walletSubscription.map(({ label }) => label);
      window.localStorage.setItem('connectedWallets', JSON.stringify(connectedWallets));

      const currentState = onboard.state.get();
      wallets = currentState.wallets;

      if (wallets.length) {
        primaryWallet = wallets[0]?.accounts[0];
        ensName = primaryWallet.ens?.name || null;
        currentChainId = parseInt(wallets[0]?.chains[0]?.id, 16);

        const ethersProvider = new ethers.providers.Web3Provider(wallets[0].provider, 'any');
        delegatecash.setProvider(ethersProvider);
        wallet.setConnectionStatus(true, primaryWallet.address, currentChainId, ethersProvider);
      } else {
        delegatecash.reset();
        wallet.setConnectionStatus(false, null, null, null);
      }
    });

    // Automatically connect to the last wallet
    const previouslyConnectedWallets = JSON.parse(window.localStorage.getItem('connectedWallets'));
    if (previouslyConnectedWallets?.length) {
      await onboard.connectWallet({
        autoSelect: { label: previouslyConnectedWallets[0], disableModals: true },
      });
    }
  });
</script>

{#if $wallet.isConnected && $wallet.currentWallet}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div id="current_wallet_container">
    <p
      id="current_wallet"
      title={$wallet.currentWallet}
      on:click={() => {
        modals.toggleWalletDropdown();
      }}
    >
      {#if ensName}
        {ensName}
      {:else}
        {truncateWallet($wallet.currentWallet, 4, 4)}
      {/if}
    </p>
    <span
      on:click={() => {
        modals.toggleWalletDropdown();
      }}
    >
      {#if foundNetwork}
        {foundNetwork.chainName}
      {:else}
        Unknown
      {/if}
    </span>

    {#if $modals.showWalletDropdown}
      <WalletOptionDropdown
        {wallets}
        on:connectWallet={() => {
          modals.setWalletDropdown(false);
          onboard.connectWallet();
        }}
        on:walletClick={event => {
          modals.setWalletDropdown(false);
          onboard.state.actions.setPrimaryWallet(wallets[event.detail]);
        }}
        on:networkChange={() => {
          modals.setWalletDropdown(false);
          dispatch('networkChange');
        }}
        on:disconnectWallet={event => {
          modals.setWalletDropdown(false);
          onboard.disconnectWallet({ label: event.detail.label });
        }}
        on:clickOutside={() => {
          modals.setWalletDropdown(false);
        }}
      />
    {/if}
  </div>
{:else}
  <Button id="connect_wallet" on:click={() => onboard.connectWallet()}>Connect Wallet</Button>
{/if}

<style lang="postcss">
  div {
    @apply relative cursor-pointer;
    &:hover p {
      @apply opacity-80;
    }
  }
  p {
    @apply font-normal inline-block;
    color: #094780;
  }

  span {
    @apply rounded-sm px-1 py-0;
    font-size: 10px;
    line-height: 12px;
    height: 15px;
    background-color: #fafafa;
    border: 1px solid #ebecef;
  }
</style>
