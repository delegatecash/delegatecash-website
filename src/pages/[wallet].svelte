<script lang="ts">
  import { params } from '@roxi/routify';
  import { submitTransaction, getDelegations } from '~/utils';
  import { wallet } from '~/stores/wallet';
  import { delegatecash } from '~/stores/delegatecash';
  import type { RegistryRow } from '~/components/RegistryTableByWallet/types';
  import Button from '~/design-system/Button.svelte';
  import RegistryTableByWallet from '~/components/RegistryTableByWallet/RegistryTableByWallet.svelte';
  import Revoke from '~/components/Revoke.svelte';
  import MainSection from '~/components/MainSection.svelte';

  $: loading = true;

  let walletParam: string;
  $: walletParam = $params?.wallet?.toLowerCase();

  $: delegations = [];

  wallet.subscribe(async walletStore => {
    if (walletStore.isConnected) {
      loading = true;
      delegations = await getDelegations(walletStore.currentWallet);
      loading = false;
    }
  });

  const revokeRow = (row: RegistryRow) => {
    switch (row.type) {
      case 'ALL':
        submitTransaction('Revoking wallet', 'Wallet revoked', $delegatecash.delegateForAll, [
          row.delegate,
          false,
        ]);
        break;
      case 'CONTRACT':
        submitTransaction(
          'Revoking contract',
          'Contract revoked',
          $delegatecash.delegateForContract,
          [row.delegate, row.contract, false],
        );
        break;
      case 'TOKEN':
        submitTransaction(
          `Revoking token #${row.tokenId}`,
          `Token #${row.tokenId} revoked`,
          $delegatecash.delegateForToken,
          [row.delegate, row.contract, row.tokenId, false],
        );
        break;
    }
  };
</script>

<MainSection
  title="Revoking wallet access is easy"
  subtitle="Use our widget to revoke yourself or a specific delegate. Or review all of your delegations and choose which one you would like to revoke."
  rightHeight={23}
>
  <div slot="left">
    {#if delegations.length && $wallet.currentWallet === walletParam}
      <Button
        action="destructive"
        on:click={() =>
          submitTransaction(
            'Revoking all delegates',
            'Delegates revoked',
            $delegatecash.revokeAllDelegates,
          )}
      >
        Revoke All Delegates
      </Button>
    {/if}

    <div>
      <a class="text-gray-900" href="/">&larr; Go back home</a>
    </div>
  </div>

  <div
    slot="right-background"
    class="absolute top-0 left-0 w-full h-full xl:rounded-l-3xl bg-gray-100"
  />

  <div slot="right" class="text-center">
    <Revoke />
    <a href="/">Need to delegate a wallet? </a>
  </div>
</MainSection>

<div class="mt-10 px-10">
  <RegistryTableByWallet
    {loading}
    data={delegations}
    showRevoke={$wallet.currentWallet === walletParam}
    on:revoke={row => revokeRow(row.detail)}
  />
</div>

<style lang="postcss">
  section {
    @apply px-6;

    @screen md {
      @apply flex w-full items-center justify-between gap-12;
    }

    @screen sm {
      @apply px-8;
    }
  }

  h2 {
    font-weight: 900;
    @apply text-2xl;
    @apply lg:leading-[64px];

    @screen sm {
      @apply text-3xl;
    }

    @screen md {
      @apply text-4xl pr-16;
    }

    @screen lg {
      @apply text-5xl pr-12;
    }

    @screen xl {
      @apply pr-12;
      font-size: 3.5rem;
    }
  }

  a {
    color: rgba(0, 0, 0, 0.5);
    @apply font-semibold inline-block text-sm mt-3;

    &.disabled {
      opacity: 1;
      cursor: not-allowed;
    }
  }

  a:hover {
    color: rgba(0, 0, 0, 1);
  }
</style>
