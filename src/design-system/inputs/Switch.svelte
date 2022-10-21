<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let label: string;
  export let checked: boolean;

  const dispatch = createEventDispatcher();
</script>

<div>
  <p>{label}</p>
  <button on:click={() => dispatch('click')} class={checked ? 'bg-green-400' : 'bg-gray-200'}>
    <span class={checked ? 'translate-x-5' : 'translate-x-0'} />
  </button>
</div>

<style lang="postcss">
  div {
    @apply flex justify-between items-center;
  }

  p {
    @apply mr-3 font-normal;
  }

  button {
    @apply relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out;
  }

  span {
    @apply pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out;
  }
</style>
