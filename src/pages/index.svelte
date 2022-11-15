<script lang="ts">
  import { onMount } from 'svelte';
  import { params } from '@roxi/routify';
  import { submitTransaction, getDelegations } from '~/utils';
  import { wallet } from '~/stores/wallet';
  import { delegatecash } from '~/stores/delegatecash';
  import { initialWalkthrough } from '~/stores/initialWalkthrough';
  import Card from '~/design-system/Card.svelte';
  import TextInput from '~/design-system/inputs/TextInput.svelte';
  import HorizontalPicker from '~/design-system/HorizontalPicker.svelte';
  import NoticeContainer from '~/design-system/NoticeContainer.svelte';
  import Button from '~/design-system/Button.svelte';
  import RegistryTableByWallet from '~/components/RegistryTableByWallet/RegistryTableByWallet.svelte';
  import InitialWalkthrough from '~/components/InitialWalkthrough/InitialWalkthrough.svelte';

  $: optionValue = 0;

  $: noticeContainerInfo = (() => {
    switch (optionValue) {
      case 0:
        return {
          description:
            'Entrust a throwaway burner wallet (eg. your hot wallet) to prove ownership on your behalf for any contract.',
        };
      case 1:
        return {
          description:
            'Entrust an entire contract to a wallet of your choice (eg. an ERC20 token).',
        };
      case 2:
        return {
          description: 'Entrust a single NFT to a wallet of your choice.',
        };
    }
  })();

  $: loading = true;
  $: delegations = [];

  $: delegateInput = '';
  $: contractInput = '';
  $: tokenIdInput = '';

  $: isFormValid = (() => {
    if (delegateInput.toLocaleLowerCase() === $wallet.currentWallet) return false;
    switch (optionValue) {
      case 0:
        return delegateInput.length === 42;
      case 1:
        return delegateInput.length === 42 && contractInput.length === 42;
      case 2:
        return (
          delegateInput.length === 42 && contractInput.length === 42 && tokenIdInput.length > 0
        );
      default:
        return false;
    }
  })();

  const onHorizontalPickerChange = e => {
    const newValue = e.detail;
    if (newValue < 2) tokenIdInput = '';
    if (newValue == 0) contractInput = '';
    optionValue = newValue;
  };

  const submitDelegation = () => {
    try {
      switch (optionValue) {
        case 0:
          submitTransaction('Delegating wallet', 'Wallet delegated', $delegatecash.delegateForAll, [
            delegateInput,
            true,
          ]);
          break;
        case 1:
          submitTransaction(
            'Delegating contract',
            'Contract delegated',
            $delegatecash.delegateForContract,
            [delegateInput, contractInput, true],
          );
          break;
        case 2:
          submitTransaction(
            `Delegating NFT #${tokenIdInput}`,
            `NFT #${tokenIdInput} delegated`,
            $delegatecash.delegateForToken,
            [delegateInput, contractInput, tokenIdInput, true],
          );
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  wallet.subscribe(async walletStore => {
    if (walletStore.isConnected) {
      delegations = await getDelegations(walletStore.currentWallet);
      loading = false;
    }
  });

  // Change the tab so it forces the user to interact with it
  initialWalkthrough.subscribe(initialWalkthroughStore => {
    if (initialWalkthroughStore.activeItem === 3) {
      optionValue = 1;
    }
  });

  onMount(() => {
    const { delegate, contract, tokenId, walkthrough } = $params;

    delegateInput = delegate || '';
    contractInput = contract || '';
    tokenIdInput = tokenId || '';

    if (contract && tokenId) {
      optionValue = 2;
    } else if (contract) {
      optionValue = 1;
    }

    //
    if (typeof walkthrough !== 'undefined') {
      initialWalkthrough.turnOn();
    }
  });
</script>

<InitialWalkthrough {optionValue} {isFormValid} />

<div
  id="main_widget_container"
  class="text-center w-full md:max-w-lg lg:w-1/2 md:w-4/6 m-auto"
  class:mb-10={delegations.length}
>
  <Card>
    <HorizontalPicker
      value={optionValue}
      options={['Wallet', 'Contract', 'NFT']}
      on:click={e => onHorizontalPickerChange(e)}
    />
    <NoticeContainer>{noticeContainerInfo.description}</NoticeContainer>
    <TextInput
      bind:value={delegateInput}
      id="delegate"
      label="Delegate Wallet"
      placeholder="Example: Your hot wallet"
    />

    {#if delegateInput.toLocaleLowerCase() === $wallet.currentWallet}
      <p>The wallet is identical to your connected wallet.</p>
    {/if}

    {#if optionValue == 1}
      <TextInput
        bind:value={contractInput}
        id="contract"
        label="Contract"
        placeholder="Example: ERC20 token address"
      />
    {/if}
    {#if optionValue == 2}
      <div class="float-right w-24">
        <TextInput
          type="number"
          bind:value={tokenIdInput}
          id="tokenid"
          label="Token ID"
          placeholder="#"
        />
      </div>
      <div class="pr-3 overflow-hidden">
        <TextInput
          bind:value={contractInput}
          id="contract"
          label="Contract"
          placeholder="Address of NFT project"
        />
      </div>
    {/if}

    <div class="mt-3">
      <Button
        size="md"
        isFullWidth
        disabled={!$wallet.isConnected || !isFormValid}
        on:click={() => {
          initialWalkthrough.reset();
          submitDelegation();
        }}
      >
        {#if $wallet.isConnected}
          Submit Delegation
        {:else}
          Connect your vault, like a Ledger, first
        {/if}
      </Button>
    </div>
  </Card>
</div>

{#if delegations.length}
  <RegistryTableByWallet {loading} data={delegations} showRevoke={false} />
{/if}

<a class:disabled={!$wallet.isConnected} href="/{$wallet.currentWallet || ''}">
  Need to revoke delegations?
</a>

<style lang="postcss">
  a {
    color: #81879b;
    @apply font-semibold inline-block text-sm mt-3;

    &.disabled {
      opacity: 0.1;
      cursor: not-allowed;
    }
  }

  a:hover {
    color: #333;
  }

  p {
    @apply text-red-500 text-xs mt-1 ml-2;
  }
</style>
