<script>
  const toDataURL = async url => {
    const blob = await fetch(url).then(res => res.blob());
    return URL.createObjectURL(blob);
  };

  const download = async (url, name) => {
    const a = document.createElement('a');
    a.href = await toDataURL(url);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
</script>

<section>
  <div>
    <p class="p-2 text-white rounded-t" style="background-color:#04724D">#04724D</p>
    <p class="p-2 text-white" style="background-color:#FFC300">#FFC300</p>
    <p class="p-2 text-white" style="background-color:#0D1821">#0D1821</p>
    <p class="p-2 text-white" style="background-color:#3083DC">#3083DC</p>
    <p class="p-2 text-white rounded-b" style="background-color:#C0FDFB">#C0FDFB</p>
  </div>
  <div>
    <img src="/images/mediakit/logo.png" />
    <p>
      <button on:click={e => download('/images/mediakit/logo.png', 'delegatecash-logo.png')}>
        logo.png
      </button>
    </p>
  </div>
  <div>
    <img src="/images/mediakit/logo.svg" />
    <p>
      <button on:click={e => download('/images/mediakit/logo.svg', 'delegatecash-logo.svg')}>
        logo.svg
      </button>
    </p>
  </div>
</section>

<style lang="postcss">
  section {
    @apply p-5;
  }

  div {
    @apply inline-block mr-10 align-middle;
    width: 150px;
  }

  p {
    @apply text-sm text-center;
  }

  button:hover {
    @apply underline;
  }

  img {
    width: 100%;
    @apply mb-3;
  }
</style>
