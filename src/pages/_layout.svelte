<script>
  import { modals } from '~/stores/modals';
  import { transaction } from '~/stores/transaction';
  import Header from '~/components/Header/Header.svelte';
  import TransactionModal from '~/components/Modals/TransactionModal.svelte';
  import NetworkSwitcherModal from '~/components/Modals/NetworkSwitcherModal/NetworkSwitcherModal.svelte';
  import CorrectNetworkAlert from '~/components/CorrectNetworkAlert.svelte';
</script>

<CorrectNetworkAlert />
<Header />
<slot />

{#if $transaction.showModal}
  <TransactionModal
    title={$transaction.title}
    message={$transaction.message}
    transactionUrl={$transaction.transactionUrl}
    on:close={() =>
      window.location.pathname === '/' ? window.location.replace('/?complete') : location.reload()}
  />
{/if}

{#if $modals.showNetworkSwitcher}
  <NetworkSwitcherModal on:close={() => modals.setNetworkSwitcher(false)} />
{/if}
