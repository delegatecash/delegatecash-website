<script lang="ts">
  import DelegateCashButton from 'delegatecash-button-svelte';

  $: label = 'Mint';
  $: connectedWallet = '0x0000000000000000000000000000000000000001';
  $: rpcUrl = 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161';

  let windowWidth = window.innerWidth;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="text-center mt-2 lg:mt-5">
  <div class="inline-block mr-2 lg:mr-7 mb-5 align-top">
    <DelegateCashButton
      connectedWallet={null}
      {rpcUrl}
      rounded={true}
      on:buttonClick={e => console.log(e)}
      on:walletSelect={e => console.log(e)}
    />
  </div>
  <div class="inline-block align-top mb-5">
    <DelegateCashButton
      {connectedWallet}
      {rpcUrl}
      rounded={true}
      on:buttonClick={e => console.log(e)}
      on:walletSelect={e => console.log(e)}
    />
  </div>
  <div />
  <div class="inline-block mr-2 lg:mr-7 align-top">
    <DelegateCashButton
      {label}
      {connectedWallet}
      {rpcUrl}
      rounded={true}
      on:buttonClick={e => console.log(e)}
      on:walletSelect={e => console.log(e)}
    />
  </div>
  {#if windowWidth > 450}
    <div class="inline-block align-top">
      <DelegateCashButton
        {label}
        {connectedWallet}
        {rpcUrl}
        rounded={true}
        theme="dark"
        forceDropdown={true}
        on:buttonClick={e => console.log(e)}
        on:walletSelect={e => console.log(e)}
      />
    </div>
  {/if}
</div>
