<script lang="ts">
  import { onMount } from 'svelte';
  import { isConnected, getCurrentWallet } from '~/utils';
  import {
    getDelegatesForAll,
    getContractLevelDelegations,
    getTokenLevelDelegations,
  } from 'delegatecash';
  import RegistryTableByWallet from '~/components/RegistryTableByWallet.svelte';

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
</script>

{#if isConnected}
  <RegistryTableByWallet {loading} data={delegations} on:revoke={row => console.log(row.detail)} />
{/if}
