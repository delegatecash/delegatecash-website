<script lang="ts">
  import { modals } from '~/stores/modals';
  import Icon from '~/design-system/icon/Icon.svelte';
  import BlurContainer from '~/design-system/BlurContainer.svelte';
  import ConnectWalletButton from '~/components/ConnectWalletButton.svelte';
  import NavLinks from './NavLinks.svelte';
  import MobileNavigation from './MobileNavigation.svelte';

  $: showMobileNav = false;
</script>

<nav>
  <a target="_BLANK" href="https://docs.delegate.cash">Documentation</a>
  <ConnectWalletButton on:networkChange={() => modals.setNetworkSwitcher(true)} />
  <button on:click={() => (showMobileNav = true)}><Icon name="ellipsis-vertical" /></button>
  <div>
    <NavLinks href="https://twitter.com/delegatecash">
      <Icon name="twitter" />
    </NavLinks>
    <NavLinks href="https://github.com/delegatecash">
      <Icon name="github" />
    </NavLinks>
    <NavLinks href="https://etherscan.io/address/0x00000000000076A84feF008CDAbe6409d2FE638B"
      ><Icon name="etherscan" />
    </NavLinks>
  </div>
</nav>

{#if showMobileNav}
  <BlurContainer on:click={() => (showMobileNav = false)}>
    <MobileNavigation
      on:close={() => (showMobileNav = false)}
      on:walletClick={() => {
        showMobileNav = false;
        modals.setNetworkSwitcher(true);
      }}
    />
  </BlurContainer>
{/if}

<style lang="postcss">
  nav {
    @apply flex text-sm font-light items-center;

    a {
      @apply hidden mr-6;
      @screen sm {
        @apply inline-block;
      }
    }

    button {
      @apply inline-block ml-3 mr-2 opacity-70 cursor-pointer w-2.5;
      &:hover {
        @apply opacity-100;
      }
      @screen sm {
        @apply hidden;
      }
    }

    div {
      @apply hidden align-middle items-center border-l border-gray-200 ml-6 pl-6 pr-4;
      @screen sm {
        @apply flex;
      }
    }
  }
</style>
