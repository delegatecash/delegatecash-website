<script>
  import { onMount } from 'svelte';

  let svgContainer;
  let bodymovin;
  // @ts-ignore
  if (window.bodymovin) bodymovin = window.bodymovin;

  onMount(() => {
    const a = bodymovin.loadAnimation({
      wrapper: svgContainer,
      prerender: true,
      animType: 'svg',
      loop: false,
      path: '/json/successCheck.json',
    });

    a.addEventListener('enterFrame', function (animation) {
      if (animation.currentTime > a.totalFrames - 21) {
        a.pause();
      }
    });
  });
</script>

<div bind:this={svgContainer} id="successAnimation" />

<style lang="postcss">
  div {
    text-align: center;
    margin: -10px auto;
    width: 30%;
  }
</style>
