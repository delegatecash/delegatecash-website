<tr>
  <slot />
</tr>

<style lang="postcss">
  tr {
    @apply bg-white border-b;
    &:last-child {
      @apply border-b-0;
    }
  }
</style>
