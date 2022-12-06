<script lang="ts">
  import Prism from 'prismjs';
  import 'prismjs/components/prism-jsx';
  import 'prismjs/components/prism-solidity';
  import 'prismjs/components/prism-json';
  import 'prism-svelte';

  import { onMount } from 'svelte';

  export let type: string;
  export let code: string;
  export let backgroundColor: string = '#f9fafc';

  onMount(() => {
    Prism.highlightAll();
  });
</script>

<svelte:head>
  <link
    href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism.min.css"
    rel="stylesheet"
  />
</svelte:head>

<div style="background:{backgroundColor}">
  <pre style="background:transparent"><code
      style="background:{backgroundColor}"
      class="language-{type}">{code}</code
    ></pre>
</div>

<style lang="postcss">
  div {
    @apply text-sm rounded-lg;
    overflow: hidden;
  }

  pre :global(.token.operator) {
    background: transparent !important;
  }
</style>
