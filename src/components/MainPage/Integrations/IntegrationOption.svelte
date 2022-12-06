<script>
  export let label;
  export let active = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class:active on:click>
  <slot />
  <h3 class="text-xs mt-3" style="letter-spacing:0.5px;">
    {#each label.split(' ') as word}
      {word}<br />
    {/each}
  </h3>
</div>

<style lang="postcss">
  div {
    @apply rounded-lg p-3 inline-block text-center align-top;

    &.active,
    &:hover {
      cursor: pointer;
      fill: #2f83dc;
      color: #2f83dc;
      background-color: #f5f9ff;
    }

    &.active :global(svg),
    &:hover :global(svg) {
      fill: #2f83dc;
    }
  }
</style>
