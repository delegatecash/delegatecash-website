<script lang="ts">
  import { onMount } from 'svelte';

  export let top: number;
  export let left: number;

  let item: HTMLElement;
  $: item = null;

  onMount(() => {
    item.style.top = top.toString() + 'px';
    item.style.left = left.toString() + 'px';
  });
</script>

<div bind:this={item} />

<style lang="postcss">
  div {
    width: var(--pulseSize);
    height: var(--pulseSize);
    border-radius: 50%;
    background: var(--blue);
    box-shadow: 0 0 0 var(--blue);
    animation: pulsing 2s infinite;
    transition: all 0.2s;
    position: absolute;
    z-index: 50;

    /* &:hover {
      --blue: rgba(209, 167, 160, 0.65);
      --transparentBlue: rgba(209, 167, 160, 0);
    } */

    /* &:active {
      transform: scale(1.5);
    } */
  }

  @keyframes pulsing {
    from {
      box-shadow: 0 0 0 0 var(--blue);
    }
    70% {
      box-shadow: 0 0 0 var(--pulseSize) var(--transparentBlue);
    }
    to {
      box-shadow: 0 0 0 0 var(--transparentBlue);
    }
  }
</style>
