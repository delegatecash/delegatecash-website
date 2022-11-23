<script type="ts">
  export let href: string;
</script>

<a target="_BLANK" {href}>
  <slot />
</a>

<style lang="postcss">
  a {
    @apply mr-6 fill-gray-500 w-6;
    &:hover {
      @apply fill-gray-600;
    }
    &:last-child {
      @apply mr-0;
    }
  }

  a:last-child {
    @apply mr-0;
  }
</style>
