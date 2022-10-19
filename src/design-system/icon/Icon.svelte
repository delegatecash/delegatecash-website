<script lang="ts">
  import iconSvgNames from './svgNames';
  export let name: keyof typeof iconSvgNames;
  $: svg = iconSvgNames[name];
</script>

<svelte:component this={svg} />
