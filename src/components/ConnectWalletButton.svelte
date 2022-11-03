<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { findNetworkByChainId } from '~/components/NetworkSwitcherModal/networks';
  import { wallet } from '~/stores/wallet';
  import { delegatecash } from '~/stores/delegatecash';
  import { truncateWallet } from '~/utils';
  import { ethers, logger } from 'ethers';
  import onboard from '~/onboard';
  import Button from '~/design-system/Button.svelte';
  import WalletOptionDropdown from '~/components/Navigation/WalletOptionDropdown.svelte';

  const dispatch = createEventDispatcher();

  $: wallets = [];
  $: primaryWallet = null;
  $: ensName = null;
  $: currentChainId = null;
  $: foundNetwork = findNetworkByChainId(currentChainId);

  $: showWalletDropdown = false;

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
        wallet.setConnectionStatus(true, primaryWallet.address, currentChainId);
      } else {
        delegatecash.reset();
        wallet.setConnectionStatus(false, null, null);
      }
    });

    // Automatically connect to the last wallet
    const previouslyConnectedWallets = JSON.parse(window.localStorage.getItem('connectedWallets'));
    if (previouslyConnectedWallets.length) {
      await onboard.connectWallet({
        autoSelect: { label: previouslyConnectedWallets[0], disableModals: true },
      });
    }
  });
</script>

{#if $wallet.isConnected && $wallet.currentWallet}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div>
    <p title={$wallet.currentWallet} on:click={() => (showWalletDropdown = !showWalletDropdown)}>
      {#if ensName}
        {ensName}
      {:else}
        {truncateWallet($wallet.currentWallet, 4, 4)}
      {/if}
    </p>
    <span>
      {#if foundNetwork}
        {foundNetwork.chainName}
      {:else}
        Unknown
      {/if}
    </span>

    {#if showWalletDropdown}
      <WalletOptionDropdown
        {wallets}
        on:connectWallet={() => {
          showWalletDropdown = false;
          onboard.connectWallet();
        }}
        on:walletClick={event => {
          showWalletDropdown = false;
          onboard.state.actions.setPrimaryWallet(wallets[event.detail]);
        }}
        on:networkChange={() => {
          showWalletDropdown = false;
          dispatch('networkChange');
        }}
        on:disconnectWallet={event => {
          showWalletDropdown = false;
          onboard.disconnectWallet({ label: event.detail.label });
        }}
        on:clickOutside={() => {
          showWalletDropdown = false;
        }}
      />
    {/if}
  </div>
{:else}
  <Button on:click={() => onboard.connectWallet()}>Connect Wallet</Button>
{/if}

<style lang="postcss">
  div {
    @apply relative cursor-pointer;
    &:hover p {
      @apply opacity-80;
    }
  }
  p {
    @apply font-normal inline;
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
