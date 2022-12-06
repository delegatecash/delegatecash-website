<script lang="ts">
  import { ethers } from 'ethers';
  import { DelegateCash } from 'delegatecash';
  import Code from '~/design-system/Code.svelte';

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
      <Code
        backgroundColor="transparent"
        type="json"
        code={JSON.stringify(
          {
            delegationsByDelegate: [
              {
                type: 'TOKEN',
                vault: '0xe5ee2B9d5320f2D1492e16567F36b578372B3d9F',
                delegate: '0x0000000000000000000000000000000000000003',
                contract: '0xC000000000000000000000000000000000000001',
                tokenId: 3,
              },
              {
                type: 'ALL',
                vault: '0x6E853e72e83ebb14DC2667f8DAd0bB78847FDEAa',
                delegate: '0x0000000000000000000000000000000000000003',
                contract: '0x0000000000000000000000000000000000000000',
                tokenId: 0,
              },
              {
                type: 'CONTRACT',
                vault: '0x6E853e72e83ebb14DC2667f8DAd0bB78847FDEAa',
                delegate: '0x0000000000000000000000000000000000000003',
                contract: '0x0000000000000000000000000000000000000002',
                tokenId: 0,
              },
            ],
          },
          null,
          1,
        )}
      />
    </div>
  </div>
</div>
