<script lang="ts">
  import { params } from '@roxi/routify';
  import { submitTransaction, getDelegations } from '~/utils';
  import { wallet } from '~/stores/wallet';
  import { delegatecash } from '~/stores/delegatecash';
  import type { RegistryRow } from '~/components/RegistryTableByWallet/types';
  import Button from '~/design-system/Button.svelte';
  import RegistryTableByWallet from '~/components/RegistryTableByWallet/RegistryTableByWallet.svelte';
  import Revoke from './revoke.svelte';

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

{#if $wallet.isConnected}
  {#if $wallet.currentWallet === walletParam}
    <Revoke />
  {/if}

  <RegistryTableByWallet
    {loading}
    data={delegations}
    showRevoke={$wallet.currentWallet === walletParam}
    on:revoke={row => revokeRow(row.detail)}
  />

  <div class="text-right py-2">
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
  </div>
{/if}
