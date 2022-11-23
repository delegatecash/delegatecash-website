<section>
  <h3>
    We are protecting <span class="stats-green">$30m+</span> assets with over
    <span class="stats-yellow">500 wallets</span> delegated.
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

      span.stats-green {
        color: #006a41;
      }

      span.stats-yellow {
        color: #ffc300;
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
