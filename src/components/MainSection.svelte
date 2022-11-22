<script lang="ts">
  export let subHeader: string = null;
  export let title: string;
  export let subtitle: string;
  export let rightHeight = 26.5;
</script>

<section>
  <div class="md:w-1/2">
    <div class="md:max-w-2xl md:mx-auto pr-0 xl:pr-10">
      {#if subHeader}<h3>{subHeader}</h3>{/if}
      <h2>{title}</h2>
      <div class="h-3 md:h-6" />
      <p class="text-base md:text-lg xl:pr-56">{subtitle}</p>
      <div class="h-5" />
      <div>
        <slot name="left" />
      </div>
    </div>
  </div>

  <div class="main__section_right" style="--main-section-right-height: {rightHeight}rem">
    <slot name="right-background" />

    <div class="md:absolute relative left-0 top-0 w-full md:block flex justify-center">
      <div class="md:p-8 max-w-xl w-full">
        <slot name="right" />
      </div>
    </div>
  </div>
</section>

<style lang="postcss">
  section {
    @apply px-6;

    @screen md {
      @apply flex w-full items-center justify-between gap-12;
    }

    @screen sm {
      @apply px-8;
    }
  }

  .main__section_right {
    @apply relative p-4 sm:p-8 -mx-6 sm:-mx-8 md:p-10 md:p-8 mt-10 md:mt-0 md:w-1/2 md:rounded-l-2xl overflow-hidden;

    @screen md {
      height: var(--main-section-right-height);
    }
  }

  h3 {
    font-weight: 600;
    letter-spacing: 1px;
    @apply uppercase text-sm mb-3;
  }

  h2 {
    font-weight: 900;
    @apply text-2xl;
    @apply lg:leading-[64px];

    @screen sm {
      @apply text-3xl;
    }

    @screen md {
      @apply text-4xl pr-16;
    }

    @screen lg {
      @apply text-5xl pr-12;
    }

    @screen xl {
      @apply pr-12;
      font-size: 3.5rem;
    }
  }

  a {
    color: rgba(0, 0, 0, 0.5);
    @apply font-semibold inline-block text-sm mt-3;

    &.disabled {
      opacity: 1;
      cursor: not-allowed;
    }
  }

  a:hover {
    color: rgba(0, 0, 0, 1);
  }
</style>
