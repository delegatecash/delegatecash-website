<script lang="ts">
  import dayjs from 'dayjs';
  import calendar from 'dayjs/plugin/calendar';
  import localizedFormat from 'dayjs/plugin/localizedFormat';
  import advancedFormat from 'dayjs/esm/plugin/advancedFormat/index';
  import relativeTime from 'dayjs/plugin/relativeTime';

  dayjs.extend(calendar);
  dayjs.extend(localizedFormat);
  dayjs.extend(advancedFormat);
  dayjs.extend(relativeTime);

  export let timestamp: number;

  const ONE_HOUR = 3600,
    ONE_WEEK = 86400 * 7;

  const isoDate = new Date(timestamp * 1000).toISOString();

  $: currentTimestamp = ~~(Date.now() / 1000);
  $: dateTimeFromNow = dayjs(isoDate).fromNow();
  $: dateTimeCalendar = dayjs(isoDate).calendar();
  $: readableDateTime = dayjs(isoDate).format('l [at] h:mma');
</script>

{#if timestamp > currentTimestamp - ONE_HOUR}
  {dateTimeFromNow}
{:else if timestamp > currentTimestamp - ONE_WEEK}
  {dateTimeCalendar}
{:else}
  {readableDateTime}
{/if}
