<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { truncateWallet } from '../utils';
  import Table from '~/design-system/Table/Table.svelte';
  import TableRow from '~/design-system/Table/TableRow.svelte';
  import TableItem from '~/design-system/Table/TableItem.svelte';
  import Label from '~/design-system/Label.svelte';
  import Icon from '~/design-system/icon/Icon.svelte';
  import DateTime from '~/design-system/DateTime.svelte';

  const dispatch = createEventDispatcher();

  type RegistryRow = {
    walletContract: string;
    type: 'wallet' | 'contract' | 'nft';
    tokenId?: number;
    dateAdded: number;
  };

  export let data: RegistryRow[] = [];
</script>

<Table columns={['Wallet / Contract', 'Type', 'Token ID', 'Date Added', 'Revoke']}>
  {#each data as row}
    <TableRow>
      <TableItem>
        <a target="_BLANK" href="https://etherscan.io/address/{row.walletContract}"
          >{truncateWallet(row.walletContract)}</a
        >
      </TableItem>
      <TableItem>
        {#if row.type == 'wallet'}
          <Label color="green">Wallet</Label>
        {:else if row.type == 'contract'}
          <Label color="orange">Contract</Label>
        {:else if row.type == 'nft'}
          <Label color="blue">NFT</Label>
        {/if}
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
      <TableItem>
        <DateTime timestamp={row.dateAdded} />
      </TableItem>
      <TableItem>
        <button class="ml-3 w-7" on:click={() => dispatch('revoke', row)}>
          <Icon name="trash" />
        </button>
      </TableItem>
    </TableRow>
  {/each}
</Table>
