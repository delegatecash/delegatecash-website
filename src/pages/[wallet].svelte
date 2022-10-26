<script lang="ts">
  import { onMount } from 'svelte';
  import { params } from '@roxi/routify';
  import { isConnected, getCurrentWallet, submitTransaction } from '~/utils';
  import {
    getDelegatesForAll,
    getContractLevelDelegations,
    getTokenLevelDelegations,
    delegateForAll,
    delegateForContract,
    delegateForToken,
    revokeAllDelegates,
  } from 'delegatecash';
  import Button from '~/design-system/Button.svelte';
  import RegistryTableByWallet from '~/components/RegistryTableByWallet/RegistryTableByWallet.svelte';
  import type { RegistryRow } from '~/components/RegistryTableByWallet/types';

  import Revoke from './revoke.svelte';

  $: loading = true;
  $: connected = false;
  $: wallet = $params.wallet.toLowerCase();
  $: currentWallet = null;
  $: delegations = [];

  onMount(async () => {
    connected = await isConnected();
    if (connected) {
      currentWallet = await getCurrentWallet();

      try {
        const [delegatesForAll, contractLevelDelegations, delegatesForContract] = await Promise.all(
          [
            await getDelegatesForAll(wallet),
            await getContractLevelDelegations(wallet),
            await getTokenLevelDelegations(wallet),
          ],
        );

        delegatesForAll.forEach(delegate => {
          delegations.push({ type: 'ALL', delegate });
        });

        contractLevelDelegations.forEach(item => {
          delegations.push({ type: 'CONTRACT', delegate: item.delegate, contract: item.contract });
        });

        delegatesForContract.forEach(item => {
          delegations.push({
            type: 'TOKEN',
            delegate: item.delegate,
            contract: item.contract,
            tokenId: item.tokenId,
          });
        });

        delegations = delegations;
        loading = false;
      } catch (err) {
        console.log(err);
      }
    }
  });

  const revokeRow = (row: RegistryRow) => {
    switch (row.type) {
      case 'ALL':
        submitTransaction('Revoking wallet', 'Wallet revoked', delegateForAll, [
          row.delegate,
          false,
        ]);
        break;
      case 'CONTRACT':
        submitTransaction('Revoking contract', 'Contract revoked', delegateForContract, [
          row.delegate,
          row.contract,
          false,
        ]);
        break;
      case 'TOKEN':
        submitTransaction(
          `Revoking token #${row.tokenId}`,
          `Token #${row.tokenId} revoked`,
          delegateForToken,
          [row.delegate, row.contract, row.tokenId, false],
        );
        break;
    }
  };
</script>

{#if isConnected}
  {#if currentWallet === wallet}
    <Revoke />
  {/if}

  <RegistryTableByWallet
    {loading}
    data={delegations}
    showRevoke={currentWallet === wallet}
    on:revoke={row => revokeRow(row.detail)}
  />

  <div class="text-right py-2">
    {#if delegations.length && currentWallet === wallet}
      <Button
        action="destructive"
        on:click={() =>
          submitTransaction('Revoking all delegates', 'Delegates revoked', revokeAllDelegates)}
        >Revoke All Delegates</Button
      >
    {/if}
  </div>
{/if}
