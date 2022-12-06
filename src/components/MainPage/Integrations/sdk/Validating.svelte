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
    const vault = '0x6E853e72e83ebb14DC2667f8DAd0bB78847FDEAa';
    const delegate = '0x0000000000000000000000000000000000000003';
    const contract = '0x0000000000000000000000000000000000000002';
    const tokenId = 3;

    const isDelegateForAll = await dc.checkDelegateForAll(delegate, vault);
    const isDelegateForContract = await dc.checkDelegateForContract(delegate, vault, contract);
    const isDelegateForToken = await dc.checkDelegateForToken(delegate, vault, contract, tokenId);

    return { isDelegateForAll, isDelegateForContract, isDelegateForToken };
  };

  $: sampleResponse = null;

  onMount(async () => {
    sampleResponse = await getSampleResonse();
  });

  const codeString = `import { DelegateCash } from "delegatecash";
  
const dc = new DelegateCash();
const vault = "0x6E853e72e83ebb14DC2667f8DAd0bB78847FDEAa";
const delegate = "0x0000000000000000000000000000000000000003";
const contract = "0x0000000000000000000000000000000000000002";
const tokenId = 3;

const isDelegateForAll = await dc.checkDelegateForAll(delegate, vault);
const isDelegateForContract = await dc.checkDelegateForContract(delegate, vault, contract);
const isDelegateForToken = await dc.checkDelegateForToken(delegate, vault, contract, tokenId);

console.log({ isDelegateForAll, isDelegateForContract, isDelegateForToken });`;
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
