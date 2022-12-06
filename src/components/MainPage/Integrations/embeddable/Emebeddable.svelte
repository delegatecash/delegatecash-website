<script lang="ts">
  import Icon from '~/design-system/icon/Icon.svelte';
  import ButtonComponent from './ButtonComponent.svelte';
  import Javascript from './Javascript.svelte';
  import React from './React.svelte';
  import Svelte from './Svelte.svelte';

  let languageSelector: 'javascript' | 'react' | 'svelte';
  $: languageSelector = 'javascript';
</script>

<section>
  <div style="border-bottom:1px solid #EFF1F4" class="flex justify-between">
    <ul>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        on:click={() => (languageSelector = 'javascript')}
        class:active={languageSelector === 'javascript'}
      >
        Javascript
      </li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li on:click={() => (languageSelector = 'react')} class:active={languageSelector === 'react'}>
        React
      </li>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <li
        on:click={() => (languageSelector = 'svelte')}
        class:active={languageSelector === 'svelte'}
      >
        Svelte
      </li>
    </ul>
    <a href="https://github.com/delegatecash/delegatecash-button" target="_BLANK">
      <Icon name="github" />
    </a>
  </div>
  <div class="lg:grid lg:grid-cols-2">
    <div>
      {#if languageSelector == 'javascript'}
        <Javascript />
      {:else if languageSelector == 'react'}
        <React />
      {:else if languageSelector == 'svelte'}
        <Svelte />
      {/if}
    </div>
    <div class="rounded-lg m-3 pt-3 pb-5 lg:py-0" style="background-color:#EFF1F4">
      <div class="h-48 lg:h-auto">
        <ButtonComponent />
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  ul {
    @apply p-2;
  }
  li {
    color: #878889;
    @apply inline-block mx-1 py-1 px-3 rounded-lg;
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
