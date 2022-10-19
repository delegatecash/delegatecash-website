<script lang="ts">
  export let id: string;
  export let label: string;
  export let placeholder: string;
  export let value: string;
  export let type: 'text' | 'number' = 'text';

  const typeAction = node => {
    node.type = type;
  };
</script>

<div>
  <label for={id}>{label}</label>
  <input use:typeAction bind:value name={id} {id} {placeholder} />
</div>

<style lang="postcss">
  div {
    @apply mt-5 relative rounded-md border border-gray-100 px-3 py-2;
  }

  label {
    @apply absolute -top-2.5 left-2 -mt-px inline-block bg-white px-2 text-sm font-medium text-gray-800;
  }

  input {
    @apply block w-full border-0 p-2 text-gray-900 placeholder-gray-300;
    &:focus {
      @apply outline-0;
    }
  }
</style>
