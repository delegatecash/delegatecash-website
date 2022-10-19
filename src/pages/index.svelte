<script lang="ts">
  import Card from '~/design-system/Card.svelte';
  import TextInput from '~/design-system/inputs/TextInput.svelte';
  import HorizontalPicker from '~/design-system/HorizontalPicker.svelte';
  import NoticeContainer from '~/design-system/NoticeContainer.svelte';

  $: optionValue = 2;

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

  $: delegate = '';
  $: contract = '';
  $: tokenId = '';

  const onHorizontalPickerChange = e => {
    const newValue = e.detail;
    if (newValue < 2) tokenId = '';
    if (newValue == 0) contract = '';
    optionValue = newValue;
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
      bind:value={delegate}
      id="delegate"
      label="Delegate Wallet"
      placeholder="Example: Your hot wallet"
    />
    {#if optionValue == 1}
      <TextInput
        bind:value={contract}
        id="contract"
        label="Contract"
        placeholder="Example: ERC20 token address"
      />
    {/if}
    {#if optionValue == 2}
      <div class="float-right w-24">
        <TextInput
          type="number"
          bind:value={tokenId}
          id="tokenid"
          label="Token ID"
          placeholder="#"
        />
      </div>
      <div class="pr-3 overflow-hidden">
        <TextInput
          bind:value={contract}
          id="contract"
          label="Contract"
          placeholder="Address of NFT project"
        />
      </div>
    {/if}

    <button
      style="background-color:#4CA6FB"
      class="bg-gray-300 text-white font-light mt-3 mb-1 p-3 rounded w-full"
      >Submit Delegation</button
    >
  </Card>
  <a class:disabled={false} href="/123">Need to revoke delegations?</a>
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
