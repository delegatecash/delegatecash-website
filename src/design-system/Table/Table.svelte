<script lang="ts">
  export let columns: string[] = [];
</script>

<div>
  <table>
    <thead>
      <tr>
        {#each columns as column}
          <th>{column}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</div>

<style lang="postcss">
  div {
    @apply overflow-x-auto relative rounded;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
  }

  table {
    @apply w-full text-sm text-left text-gray-500;
  }

  thead {
    @apply text-gray-700 font-light bg-gray-50;
  }

  th {
    @apply py-3 px-6 font-light;
    min-width: 110px;
  }
</style>
