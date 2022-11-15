<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { truncateWallet } from '../../utils';
  import Table from '~/design-system/Table/Table.svelte';
  import TableRow from '~/design-system/Table/TableRow.svelte';
  import TableItem from '~/design-system/Table/TableItem.svelte';
  import Label from '~/design-system/Label.svelte';
  import Icon from '~/design-system/icon/Icon.svelte';
  import HorizontalLoading from '~/design-system/HorizontalLoading.svelte';

  const dispatch = createEventDispatcher();

  type RegistryRow = {
    delegate: string;
    type: 'NONE' | 'ALL' | 'CONTRACT' | 'TOKEN';
    contract?: string;
    tokenId?: number;
  };

  export let loading: boolean;
  export let data: RegistryRow[];
  export let showRevoke = false;

  $: columns = (() => {
    let cols = ['Delegate', 'Type', 'Contract', 'Token ID'];
    if (showRevoke) cols = cols.concat(['Revoke']);
    return cols;
  })();
</script>

<Table {columns}>
  {#if !loading}
    {#if data.length === 0}
      <TableRow>
        <TableItem isFullWidth>
          <div class="w-full my-3 text-center">This wallet has no delegations</div>
        </TableItem>
      </TableRow>
    {:else}
      {#each data as row}
        <TableRow>
          <TableItem>
            <a target="_BLANK" href="https://etherscan.io/address/{row.delegate}"
              >{truncateWallet(row.delegate)}</a
            >
          </TableItem>
          <TableItem>
            {#if row.type == 'ALL'}
              <Label color="green">Wallet</Label>
            {:else if row.type == 'CONTRACT'}
              <Label color="orange">Contract</Label>
            {:else if row.type == 'TOKEN'}
              <Label color="blue">NFT</Label>
            {/if}
          </TableItem>
          <TableItem>
            <div class="ml-3">
              {#if row.contract}
                <a target="_BLANK" href="https://etherscan.io/address/{row.contract}"
                  >{truncateWallet(row.contract)}</a
                >
              {:else}
                &mdash;
              {/if}
            </div>
          </TableItem>
          <TableItem>
            <div class="ml-3">
              {#if row.tokenId}
                {row.tokenId}
              {:else}
                &mdash;
              {/if}
            </div>
          </TableItem>
          {#if showRevoke}
            <TableItem>
              <button class="ml-3 w-7 hover:fill-red-500" on:click={() => dispatch('revoke', row)}>
                <Icon name="trash" />
              </button>
            </TableItem>
          {/if}
        </TableRow>
      {/each}
    {/if}
  {:else}
    <TableRow>
      <TableItem isFullWidth>
        <div class="w-full my-3 text-center">
          <HorizontalLoading />
        </div>
      </TableItem>
    </TableRow>
  {/if}
</Table>
