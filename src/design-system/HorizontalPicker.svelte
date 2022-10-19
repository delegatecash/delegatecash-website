<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let options: string[];
  export let value = 0;
</script>

<ul>
  {#each options as option, index}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li
      on:click={() => dispatch('click', index)}
      class:active={index === value}
      style="width:{100 / options.length}%;"
    >
      {option}
    </li>
  {/each}
</ul>

<style lang="postcss">
  ul {
    background-color: #f5f5f5;
    @apply rounded-lg p-2;
  }

  li {
    @apply text-center inline-block font-light opacity-50 cursor-pointer;
    &:hover {
      @apply opacity-100;
    }
    &.active {
      @apply bg-white rounded-lg p-2 font-normal opacity-100;
    }
  }
</style>
