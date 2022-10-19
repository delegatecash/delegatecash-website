<script lang="ts">
  export let title: string = '';
</script>

<div>
  {#if title?.length}<p>{title}</p>{/if}
  <slot />
</div>

<style lang="postcss">
  div {
    @apply p-3 text-xs mt-3 rounded-lg font-light;
    color: #485273;
    background-color: #f5f9ff;
  }

  p {
    @apply text-lg font-semibold mb-3;
  }
</style>
