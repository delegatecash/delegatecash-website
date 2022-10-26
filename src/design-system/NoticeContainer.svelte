<script lang="ts">
  export let title: string = '';
  export let type: 'primary' | 'destruction' = 'primary';
</script>

<div class={type}>
  {#if title?.length}<p>{title}</p>{/if}
  <slot />
</div>

<style lang="postcss">
  div {
    @apply p-3 text-xs mt-3 rounded-lg font-light;

    &.primary {
      color: #485273;
      background-color: #f5f9ff;
    }

    &.destruction {
      color: #c53030;
      background-color: #fff5f5;
    }
  }

  p {
    @apply text-lg font-semibold mb-3;
  }
</style>
