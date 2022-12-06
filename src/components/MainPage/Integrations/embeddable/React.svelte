<script lang="ts">
  import Code from '~/design-system/Code.svelte';

  const codeString = `import DelegateCashButton from 'delegatecash-button-react';

function Example() {
  return (
    <DelegateCashButton
      label="Mint"
      connectedWallet="0x0000000000000000000000000000000000000001"
      rpcUrl="https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
      rounded={true}
      onButtonClick={event => console.log(event.detail)}
      onWalletSelect={event => console.log(event.detail)}
    />
  );
}

export default Example;`;
</script>

<Code type="jsx" code={codeString} />
