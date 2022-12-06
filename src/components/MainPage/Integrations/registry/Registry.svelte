<script lang="ts">
  import Icon from '~/design-system/icon/Icon.svelte';
  import MintClaim from './MintClaim.svelte';
</script>

<section>
  <div style="border-bottom:1px solid #EFF1F4" class="flex justify-between">
    <ul>
      <li class="active">Claim / Mint</li>
    </ul>
    <a href="https://github.com/delegatecash/delegation-registry" target="_BLANK">
      <Icon name="github" />
    </a>
  </div>
  <div class="grid grid-cols-1">
    <div class="">
      <MintClaim />
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
