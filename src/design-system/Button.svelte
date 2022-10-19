<script lang="ts">
  import disableClick from './actions/disableClick';

  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let action: 'primary' = 'primary';
  export let size: 'sm' = 'sm';
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

    &.primary {
      background-color: #00abeb;
      color: #fff;
    }
  }
</style>
