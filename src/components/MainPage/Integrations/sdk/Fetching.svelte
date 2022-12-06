<script lang="ts">
  import { ethers } from 'ethers';
  import { DelegateCash } from 'delegatecash';
  import Code from '~/design-system/Code.svelte';
  import { onMount } from 'svelte';

  const getSampleResonse = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      'any',
    );
    const dc = new DelegateCash(provider);
    const delegate = '0x0000000000000000000000000000000000000003';
    const delegationsByDelegate = await dc.getDelegationsByDelegate(delegate);

    return { delegationsByDelegate };
  };

  $: sampleResponse = null;

  onMount(async () => {
    sampleResponse = await getSampleResonse();
  });

  const codeString = `import { DelegateCash } from "delegatecash";
  
const dc = new DelegateCash();
const delegate = "0x0000000000000000000000000000000000000003";
const delegationsByDelegate = await dc.getDelegationsByDelegate(delegate);

console.log({ delegationsByDelegate });
`;
</script>

<div class="lg:grid lg:grid-cols-2">
  <div><Code type="javascript" code={codeString} /></div>
  <div class="rounded-lg m-3 pt-3 pb-5 lg:py-0" style="background-color:#EFF1F4;overflow:scroll">
    <div class="h-auto lg:h-48">
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
