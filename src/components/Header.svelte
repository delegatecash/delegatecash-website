<script>
  import Logo from './Logo.svelte';
  import Navigation from './Navigation/Navigation.svelte';
</script>

<header>
  <a href="/">
    <Logo />
  </a>
  <Navigation />
</header>

<style lang="postcss">
  header {
    @apply flex-1 p-2 mb-10 bg-white border-b border-slate-900/10 flex justify-between items-center;

    div {
      @apply hidden;

      @screen sm {
        @apply block;
      }
    }
  }

  a {
    @apply mr-5 ml-1;
  }
</style>
