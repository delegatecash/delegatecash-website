<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const handClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('blur_container')) {
      dispatch('click');
    }
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="blur_container" on:click={handClick}>
  <slot />
</div>

<style lang="postcss">
  div {
    @apply fixed w-full h-full left-0 top-0 z-50 backdrop-blur-sm bg-black/20;
  }
</style>
