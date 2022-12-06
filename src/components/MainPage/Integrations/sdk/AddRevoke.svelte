<script lang="ts">
  import Code from '~/design-system/Code.svelte';

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
      <Code
        backgroundColor="transparent"
        type="json"
        code={JSON.stringify(
          {
            delegateForAll:
              '0x685ee3e800000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001',
            revokeAllDelegates: '0x36137872',
          },
          null,
          1,
        )}
      />
    </div>
  </div>
</div>
