<script lang="ts">
  import Code from '~/design-system/Code.svelte';

  const codeString = `function claim(address _vault) public returns (uint256 tokenId) {
  address requester = msg.sender;
  
  if (_vault != address(0)) { 
    bool isDelegateValid = dc.checkDelegateForContract(msg.sender, _vault, address(this));
    require(isDelegateValid, "invalid delegate-vault pairing");
    requester = _vault;
  }
  
  // Your claim code below using \`requester\` address
}`;
</script>

<Code type="solidity" code={codeString} />
