<script lang="ts">
  import disableClick from './actions/disableClick';

  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let action: 'primary' | 'destructive' = 'primary';
  export let size: 'sm' | 'md' = 'sm';
  export let disabled = false;
  export let href = '';
  export let isFullWidth = false;

  $: elClass = `button_component ${action} ${size} ${isFullWidth ? 'w-full' : ''}`;
</script>

{#if href}
  <a class={elClass} {href} {disabled} use:disableClick={disabled} on:click>
    <slot />
  </a>
{:else}
  <button class={elClass} {type} {disabled} on:click>
    <slot />
  </button>
{/if}

<style lang="postcss">
  button,
  a {
    @apply text-center rounded-md inline-block font-light;

    &.sm {
      @apply px-4 py-1 text-sm;
    }

    &.md {
      @apply p-3;
    }

    &.primary {
      background-color: #4ca6fb;
      color: #fff;
    }

    &.destructive {
      @apply bg-red-500;
      color: #fff;

      &:hover {
        @apply bg-red-400;
      }
    }

    &:disabled {
      @apply opacity-40 cursor-not-allowed;
    }
  }
</style>
