<script lang="ts">
  import Emebeddable from './embeddable/Emebeddable.svelte';
  import Registry from './registry/Registry.svelte';
  import Sdk from './sdk/Sdk.svelte';
  export let category = 'embeddable';
</script>

{#if category == 'embeddable'}
  <Emebeddable />
{:else if category === 'sdk'}
  <Sdk />
{:else if category === 'registry'}
  <Registry />
{/if}
