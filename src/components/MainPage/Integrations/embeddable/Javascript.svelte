<script lang="ts">
  import Code from '~/design-system/Code.svelte';

  const codeString = `<${''}html>
  <${''}head>
    <${''}script src="https://cdn.jsdelivr.net/npm/delegatecash-button@latest/delegate-cash-button.js" type="module"><${''}/script>
  <${''}/head>
  <${''}body>
    <delegate-cash-button
      label="Mint"
      connected-wallet="0x0000000000000000000000000000000000000001"
      rpc-url="https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
      rounded="true"
    />
  <${''}/body>
<${''}/html>`;
</script>

<Code type="html" code={codeString} />
