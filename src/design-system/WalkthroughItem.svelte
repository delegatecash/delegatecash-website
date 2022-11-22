<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let title: string = '';
  export let position: 'top' | 'bottom' | 'left' = 'bottom';
  export let target: string;
  export let width: number;
  export let showNext = false;

  let item: HTMLElement;
  $: item = null;

  const onResizeScrollMount = () => {
    try {
      const findTarget: HTMLElement = document.getElementById(target);
      const targetInfo: DOMRect = JSON.parse(JSON.stringify(findTarget.getClientRects()))[0];

      // Assign item width first because it determins the item height
      item.style.maxWidth = (width || targetInfo?.width).toString() + 'px';
      item.style.right = (document.body.clientWidth - targetInfo?.right).toString() + 'px';

      if (position === 'top') {
        item.style.width = targetInfo.width.toString() + 'px';
        item.style.top = (targetInfo?.top - item.offsetHeight - 10).toString() + 'px';
      } else if (position === 'bottom') {
        item.style.top = (targetInfo?.top + targetInfo?.height + 20).toString() + 'px';
      } else if (position === 'left') {
        item.style.top = (targetInfo?.top).toString() + 'px';
        item.style.right =
          (document.body.clientWidth - targetInfo?.right + targetInfo?.width + 10).toString() +
          'px';
      }

      if (item.offsetLeft === 0) {
        item.style.marginLeft = '10px';
      } else item.style.marginLeft = '0px';
    } catch {}
  };

  onMount(() => {
    onResizeScrollMount();
  });
  addEventListener('resize', onResizeScrollMount);
  addEventListener('scroll', onResizeScrollMount);
</script>

<section bind:this={item}>
  <div>
    {#if title}<p class="text-xs">{title}</p>{/if}
    <slot />
  </div>
  {#if showNext}
    <button on:click={() => dispatch('next')}>Next</button>
  {/if}
</section>

<style lang="postcss">
  section {
    @apply fixed right-0;
    z-index: 31;
  }

  div {
    @apply w-full rounded shadow-lg border-4 bg-white p-2;
  }

  p {
    @apply text-left mb-1;
  }

  button {
    float: right;
    color: #000;
    @apply mt-2  bg-white px-3 py-1 text-sm rounded;
  }
</style>
