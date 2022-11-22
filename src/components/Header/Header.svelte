<script>
  import Navigation from './Navigation/DesktopNavigation.svelte';
</script>

<header>
  <a href="/">
    <img src="/images/delegatecash-logo.png" />
  </a>
  <Navigation />
</header>

<style lang="postcss">
  header {
    z-index: 1;
    @apply px-6 py-5 sm:py-9 flex justify-between items-center;

    @screen lg {
      @apply px-12;
    }

    img {
      width: 40px;

      @screen md {
        width: 50px;
      }
    }

    /* @screen lg {
      @apply px-10;
    }

    @screen sm {
      @apply px-0;
    } */

    div {
      @apply hidden;

      @screen md {
        @apply block;
      }
    }
  }

  a {
    @apply mr-5 ml-1;
  }
</style>
