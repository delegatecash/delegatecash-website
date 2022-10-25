<script lang="ts">
  import { onMount } from 'svelte';
  import { isConnected, getCurrentWallet, revoke } from '~/utils';
  import {
    getDelegatesForAll,
    getContractLevelDelegations,
    getTokenLevelDelegations,
    delegateForAll,
    delegateForContract,
    delegateForToken,
  } from 'delegatecash';
  import RegistryTableByWallet from '~/components/RegistryTableByWallet/RegistryTableByWallet.svelte';
  import type { RegistryRow } from '~/components/RegistryTableByWallet/types';

  $: loading = true;
  $: connected = false;
  $: currentWallet = null;
  $: delegations = [];

  onMount(async () => {
    connected = await isConnected();
    if (connected) {
      currentWallet = await getCurrentWallet();

      try {
        const [delegatesForAll, contractLevelDelegations, delegatesForContract] = await Promise.all(
          [
            await getDelegatesForAll(currentWallet),
            await getContractLevelDelegations(currentWallet),
            await getTokenLevelDelegations(currentWallet),
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
        revoke('Revoking wallet', 'Wallet revoked', delegateForAll, [row.delegate, false]);
        break;
      case 'CONTRACT':
        revoke('Revoking contract', 'Contract revoked', delegateForContract, [
          row.delegate,
          row.contract,
          false,
        ]);
        break;
      case 'TOKEN':
        revoke(
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
  <RegistryTableByWallet {loading} data={delegations} on:revoke={row => revokeRow(row.detail)} />
{/if}
