<script lang="ts">
  import Icon from '~/design-system/icon/Icon.svelte';
  import Validating from './Validating.svelte';
  import Fetching from './Fetching.svelte';
  import AddRevoke from './AddRevoke.svelte';

  let optionSelector: 'validating' | 'fetching' | 'addrevoke';
  $: optionSelector = 'validating';
</script>

<section>
  <div style="border-bottom:1px solid #EFF1F4" class="flex justify-between">
    <ul>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        on:click={() => (optionSelector = 'validating')}
        class:active={optionSelector === 'validating'}
      >
        Validating
      </li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        on:click={() => (optionSelector = 'fetching')}
        class:active={optionSelector === 'fetching'}
      >
        Fetching
      </li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        on:click={() => (optionSelector = 'addrevoke')}
        class:active={optionSelector === 'addrevoke'}
      >
        Add / Revoke
      </li>
    </ul>
    <a href="https://github.com/delegatecash/delegatecash-javascript-sdk" target="_BLANK">
      <Icon name="github" />
    </a>
  </div>

  {#if optionSelector === 'validating'}
    <Validating />
  {:else if optionSelector === 'fetching'}
    <Fetching />
  {:else if optionSelector === 'addrevoke'}
    <AddRevoke />
  {/if}
</section>

<style lang="postcss">
  ul {
    @apply p-2;
  }
  li {
    color: #878889;
    @apply inline-block mx-1 py-1 px-1 sm:px-3 rounded-lg;
    display: inline-block;

    &:hover {
    }

    &.active,
    &:hover {
      color: #0c1822;
      cursor: pointer;
      background-color: #eff1f4;
    }
  }

  section {
    background-color: #f9fafc;
    border: 1px solid transparent;
    @apply rounded-lg;
  }

  a {
    @apply hidden sm:flex w-5 mr-3 items-center;
    fill: #8a8b8c;
    &:hover {
      fill: #0c1822;
    }
  }
</style>
