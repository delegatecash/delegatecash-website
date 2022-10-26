<script lang="ts">
  import { wallet } from '~/stores/wallet';
  import { revokeSelf, revokeDelegate } from 'delegatecash';
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
          description: 'Revoke yourself (eg. your cold wallet) as a delegate for a specific vault.',
        };
      case 1:
        return {
          description: 'Revoke a specific delegate of all their permissions.',
        };
    }
  })();

  $: vault = '';
  $: delegate = '';
  $: isFormValid = (() => {
    switch (optionValue) {
      case 0:
        return vault.length === 42;
      case 1:
        return delegate.length === 42;
      default:
        return false;
    }
  })();

  const onHorizontalPickerChange = e => {
    const newValue = e.detail;
    vault = '';
    delegate = '';
    optionValue = newValue;
  };

  const submitRevoke = () => {
    try {
      switch (optionValue) {
        case 0:
          submitTransaction('Revoking vault', 'Vault revoked', revokeSelf, [vault]);
          break;
        case 1:
          submitTransaction('Revoking delegate', 'Delegate revoked', revokeDelegate, [delegate]);
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };
</script>

<div class="text-center w-full md:max-w-lg lg:w-1/2 md:w-4/6 m-auto mb-10">
  <Card>
    <HorizontalPicker
      value={optionValue}
      options={['Revoke Self', 'Revoke Delegate']}
      on:click={e => onHorizontalPickerChange(e)}
    />
    <NoticeContainer type="destruction">{noticeContainerInfo.description}</NoticeContainer>

    {#if optionValue == 0}
      <TextInput
        bind:value={vault}
        id="vault"
        label="Vault"
        placeholder="Example: Your cold wallet"
      />
    {/if}

    {#if optionValue == 1}
      <TextInput
        bind:value={delegate}
        id="delegate"
        label="Delegate"
        placeholder="Example: Your hot wallet"
      />
    {/if}

    <div class="mt-3">
      <Button
        size="md"
        action="destructive"
        isFullWidth
        disabled={!$wallet.isConnected || !isFormValid}
        on:click={() => submitRevoke()}
      >
        {#if $wallet.isConnected}
          Revoke
        {:else}
          Connect wallet first
        {/if}
      </Button>
    </div>
  </Card>
</div>
