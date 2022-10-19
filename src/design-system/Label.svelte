<script lang="ts">
  export let color: 'green' | 'orange' | 'blue';
</script>

<div class={`label_${color}`}>
  <slot />
</div>

<style lang="postcss">
  div {
    @apply inline-block py-1 text-xs text-center rounded;
    width: 65px;

    &.label_green {
      background-color: #d4f2ea;
      color: #5b8176;
    }

    &.label_orange {
      background-color: #ffe8d6;
      color: #a88568;
    }

    &.label_blue {
      background-color: #c7e7fa;
      color: #83a9c0;
    }
  }
</style>
