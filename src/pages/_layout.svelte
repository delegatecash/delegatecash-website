<script>
  import { modals } from '~/stores/modals';
  import { transaction } from '~/stores/transaction';
  import Header from '~/components/Header.svelte';
  import TransactionModal from '~/components/TransactionModal.svelte';
  import NetworkSwitcherModal from '~/components/NetworkSwitcherModal/NetworkSwitcherModal.svelte';
  import CorrectNetworkWrapper from '~/components/CorrectNetworkWrapper.svelte';
  import { initialWalkthrough } from '~/stores/initialWalkthrough';
</script>

<Header />

<div class="mt-24 container mx-auto px-4 pb-10 text-center">
  <h1 class="text-3xl font-bold">Delegation Registry</h1>
  <p class="mt-3 mb-5">
    Keep your vaulted NFTs safe. Claim airdrops, prove ownership, and more from your hot wallet.
  </p>

  <CorrectNetworkWrapper>
    <slot />
  </CorrectNetworkWrapper>
</div>

{#if $transaction.showModal}
  <TransactionModal
    title={$transaction.title}
    message={$transaction.message}
    transactionUrl={$transaction.transactionUrl}
    on:close={() => location.reload()}
  />
{/if}

{#if $modals.showNetworkSwitcher}
  <NetworkSwitcherModal on:close={() => modals.setNetworkSwitcher(false)} />
{/if}
