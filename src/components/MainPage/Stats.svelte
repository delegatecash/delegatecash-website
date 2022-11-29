<script>
  import { onMount } from 'svelte';
  import { getStats } from '~/utils';

  $: stats = { tvp: 120, totalUsers: 900 };

  onMount(async () => {
    stats = await getStats();
  });
</script>

<section>
  <h3>
    We are protecting <a
      href="https://dune.com/queries/1649062/2733111"
      target="_BLANK"
      class="stats-green">${stats.tvp}m+</a
    >
    assets with over
    <a href="https://dune.com/queries/1485539/2507779" target="_BLANK" class="stats-yellow"
      >{stats.totalUsers.toLocaleString()} wallets</a
    > delegated.
  </h3>
</section>

<style lang="postcss">
  section {
    color: #333;
    @apply w-full mx-auto px-5 my-10 text-center;

    @screen md {
      max-width: 800px;
    }

    @screen lg {
      max-width: 1000px;
    }

    h3 {
      font-weight: 900;
      @apply text-2xl;
      @apply lg:leading-[64px];

      a.stats-green {
        color: #006a41;

        &:hover {
          border-bottom: 8px solid rgba(0, 106, 65, 0.9);
        }
      }

      a.stats-yellow {
        color: #ffc300;

        &:hover {
          border-bottom: 8px solid rgba(255, 195, 0, 0.9);
        }
      }

      a:hover {
        cursor: pointer;
        opacity: 0.9;
      }

      @screen sm {
        @apply text-3xl;
      }

      @screen md {
        @apply text-4xl;
        line-height: 3rem;
      }

      @screen lg {
        @apply text-5xl;
        line-height: 4rem;
      }
    }
  }
</style>
