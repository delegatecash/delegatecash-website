<script lang="ts">
  import { ethers } from 'ethers';
  import { DelegateCash, rawDelegateForAll, rawRevokeAllDelegates } from 'delegatecash';
  import Code from '~/design-system/Code.svelte';
  import { onMount } from 'svelte';

  const getSampleResonse = async () => {
    const vault = '0x0000000000000000000000000000000000000001';
    const delegateForAll = rawDelegateForAll(vault, true);
    const revokeAllDelegates = rawRevokeAllDelegates();

    return { delegateForAll, revokeAllDelegates };
  };

  $: sampleResponse = null;

  onMount(async () => {
    sampleResponse = await getSampleResonse();
  });

  const codeString = `import { DelegateCash, rawDelegateForAll, rawRevokeAllDelegates } from "delegatecash";

const dc = new DelegateCash();
const vault = '0x0000000000000000000000000000000000000001';

/// Use the following to initiate the transaction
await dc.delegateForAll(vault, true);

// Or use the below to get the raw transaction
const delegateForAll = rawDelegateForAll(vault, true);
const revokeAllDelegates = rawRevokeAllDelegates();

console.log({ delegateForAll, revokeAllDelegates });
`;
</script>

<div class="lg:grid lg:grid-cols-2">
  <div><Code type="javascript" code={codeString} /></div>
  <div class="rounded-lg m-3 pt-3 pb-5 lg:py-0" style="background-color:#EFF1F4;overflow:scroll">
    <div class="lg:h-auto">
      {#if sampleResponse}
        <Code
          backgroundColor="transparent"
          type="json"
          code={JSON.stringify(sampleResponse, null, 1)}
        />
      {/if}
    </div>
  </div>
</div>
