<script lang="ts">
  export let isFullWidth: boolean = false;
</script>

<td colspan={isFullWidth ? 5 : null}>
  <slot />
</td>

<style lang="postcss">
  td {
    @apply py-3 px-6 font-normal text-gray-900 whitespace-nowrap;
  }
</style>
