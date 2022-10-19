<script lang="ts">
  import RegistryTableByWallet from '~/components/RegistryTableByWallet.svelte';
</script>

<RegistryTableByWallet
  data={[
    {
      walletContract: '0xe79bb39b84cc8a3ab47144bcd8419309551e166d',
      type: 'wallet',
      tokenId: null,
      dateAdded: 1666015841,
    },
    {
      walletContract: '0xe79bb39b84cc8a3ab47144bcd8419309551e166d',
      type: 'contract',
      tokenId: null,
      dateAdded: 1665750493,
    },
    {
      walletContract: '0xe79bb39b84cc8a3ab47144bcd8419309551e166d',
      type: 'nft',
      tokenId: 1,
      dateAdded: 1665288000,
    },
  ]}
  on:revoke={row => console.log(row.detail)}
/>
