<div class="backdrop-blur-sm bg-black/20">
  <slot />
</div>

<style lang="postcss">
  div {
    @apply fixed w-full h-full left-0 top-0 z-50 backdrop-blur-sm bg-black/20;
  }
</style>
