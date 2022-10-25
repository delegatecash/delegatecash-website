<section>
  <div class="line" />
  <div class="line" />
  <div class="line" />
</section>

<style lang="postcss">
  div:nth-last-child(1) {
    animation: HorizontalLoading 1.5s 1s infinite;
  }
  div:nth-last-child(2) {
    animation: HorizontalLoading 1.5s 0.5s infinite;
  }
  div:nth-last-child(3) {
    animation: HorizontalLoading 1.5s 0s infinite;
  }

  div {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: #d7e7f5;
  }

  @keyframes HorizontalLoading {
    0% {
      width: 15px;
    }
    50% {
      width: 35px;
    }
    100% {
      width: 15px;
    }
  }
</style>
