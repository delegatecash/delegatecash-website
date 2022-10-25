<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import BlurContainer from '~/design-system/BlurContainer.svelte';
  import HorizontalLoading from '~/design-system/HorizontalLoading.svelte';
  import SuccessAnimationIcon from './SuccessAnimationIcon/SuccessAnimationIcon.svelte';
  import Icon from '~/design-system/icon/Icon.svelte';

  const dispatch = createEventDispatcher();

  export let title;
  export let message;
  export let transactionUrl;
</script>

<BlurContainer>
  <section>
    <h3>{title}</h3>
    <p>{message}</p>

    {#if !transactionUrl}
      <div class="mt-6" class:mb-5={transactionUrl !== null}>
        <HorizontalLoading />
      </div>
    {:else}
      <SuccessAnimationIcon />
      <a target="_BLANK" href={transactionUrl}>View transaction</a>
      <button on:click={() => dispatch('close')}>
        <div style="width:40%; margin: 0 auto;fill:#fff;">
          <Icon name="x" />
        </div>
      </button>
    {/if}
  </section>
</BlurContainer>

<style lang="postcss">
  section {
    @apply fixed text-center w-full max-w-xs bg-white rounded-lg shadow-lg p-6 font-semibold text-slate-900;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  h3 {
    @apply text-xl;
  }
  p {
    @apply text-xs font-light relative;
    z-index: 1;
  }

  a {
    @apply block w-full text-center text-xs relative;
    color: #094780;
    z-index: 1;
  }

  button {
    @apply fixed;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    right: -10px;
    top: -10px;
    background-color: #333;
    color: #fff;
    z-index: -1;

    &:hover {
      @apply opacity-90;
    }
  }
</style>
