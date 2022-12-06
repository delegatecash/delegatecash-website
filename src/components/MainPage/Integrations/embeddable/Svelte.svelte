<script lang="ts">
  import Code from '~/design-system/Code.svelte';

  const codeString = `<${''}script>
  import DelegateCashButton from "delegatecash-button-svelte";
<${''}/script>

<${''}DelegateCashButton
  label="Mint"
  connectedWallet="0x0000000000000000000000000000000000000001"
  rpcUrl="https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  rounded={true}
  on:buttonClick={event => console.log(event.detail)}
  on:walletSelect={event => console.log(event.detail)}
${''}/>`;
</script>

<Code type="svelte" code={codeString} />
