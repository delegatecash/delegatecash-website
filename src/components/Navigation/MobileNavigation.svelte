<script>
  import { createEventDispatcher } from 'svelte';
  import Button from '~/design-system/Button.svelte';
  import Icon from '~/design-system/icon/Icon.svelte';
  import NavLinks from './NavLinks.svelte';

  const dispatch = createEventDispatcher();
</script>

<nav>
  <button class="hover:text-slate-600" on:click={() => dispatch('close')}><Icon name="x" /></button>
  <div>
    <ul>
      <li>
        <a href="#">Documentation</a>
      </li>
    </ul>
  </div>
  <footer>
    <Button>Connect Wallet</Button>
    <div class="flex">
      <NavLinks href="https://github.com/delegatecash">
        <Icon name="github" />
      </NavLinks>
      <NavLinks href="https://etherscan.io/address/0x00000000000076A84feF008CDAbe6409d2FE638B"
        ><Icon name="etherscan" />
      </NavLinks>
    </div>
  </footer>
</nav>

<style lang="postcss">
  nav {
    @apply fixed top-2 right-2 w-full max-w-xs bg-white rounded-lg shadow-lg p-6 font-semibold text-slate-900;
  }

  ul {
    @apply space-y-3;
  }

  a:hover {
    @apply text-slate-500;
  }

  footer {
    @apply mt-6 pt-5 border-t border-slate-200 flex items-center justify-between;
  }

  button {
    @apply absolute top-8 right-5 w-3 h-3 flex items-center justify-center text-slate-500;
  }
</style>
