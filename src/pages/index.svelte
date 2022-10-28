<script lang="ts">
  import { onMount } from 'svelte';
  import { params } from '@roxi/routify';
  import { wallet } from '~/stores/wallet';
  import { delegateForAll, delegateForContract, delegateForToken } from 'delegatecash';
  import { submitTransaction } from '~/utils';
  import Card from '~/design-system/Card.svelte';
  import TextInput from '~/design-system/inputs/TextInput.svelte';
  import HorizontalPicker from '~/design-system/HorizontalPicker.svelte';
  import NoticeContainer from '~/design-system/NoticeContainer.svelte';
  import Button from '~/design-system/Button.svelte';

  $: optionValue = 0;

  $: noticeContainerInfo = (() => {
    switch (optionValue) {
      case 0:
        return {
          description:
            'Entrust a wallet (eg. your hot wallet) to prove ownership on your behalf for any contract.',
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

  $: delegateInput = '';
  $: contractInput = '';
  $: tokenIdInput = '';
  $: isFormValid = (() => {
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

  onMount(() => {
    const { delegate, contract, tokenId } = $params;

    delegateInput = delegate || '';
    contractInput = contract || '';
    tokenIdInput = tokenId || '';

    if (contract && tokenId) {
      optionValue = 2;
    } else if (contract) {
      optionValue = 1;
    }
  });

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
          submitTransaction('Delegating wallet', 'Wallet delegated', delegateForAll, [
            delegateInput,
            true,
          ]);
          break;
        case 1:
          submitTransaction('Delegating contract', 'Contract delegated', delegateForContract, [
            delegateInput,
            contractInput,
            true,
          ]);
          break;
        case 2:
          submitTransaction(
            `Delegating NFT #${tokenIdInput}`,
            `NFT #${tokenIdInput} delegated`,
            delegateForToken,
            [delegateInput, contractInput, tokenIdInput, true],
          );
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };
</script>

<div class="text-center w-full md:max-w-lg lg:w-1/2 md:w-4/6 m-auto">
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
        on:click={() => submitDelegation()}
      >
        {#if $wallet.isConnected}
          Submit Delegation
        {:else}
          Connect wallet first
        {/if}
      </Button>
    </div>
  </Card>
  <a class:disabled={!$wallet.isConnected} href="/{$wallet.currentWallet || ''}">
    Need to revoke delegations?
  </a>
</div>

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
</style>
