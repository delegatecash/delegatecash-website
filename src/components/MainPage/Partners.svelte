<script>
  const partners = [
    { url: 'https://artblocks.io', image: '/images/partners/artblocks.png' },
    { url: 'https://tokenproof.xyz', image: '/images/partners/tokenproof.png' },
    { url: 'https://www.cyberbrokers.com', image: '/images/partners/cyberbrokers.png' },
    { url: 'https://invisiblefriends.io', image: '/images/partners/invisible-friends.png' },
    { url: 'https://www.forgottenrunes.com', image: '/images/partners/forgotten-runes.png' },
    { url: 'https://punksclub.io', image: '/images/partners/punks-club.png' },
  ];
</script>

<div class="pb-5 px-5 mx-auto text-center w-full" style="max-width:600px;">
  <h3>Join us with the top projects in the space on any EVM chain you want.</h3>
</div>

<section>
  <article class="wrapper">
    <div class="marquee">
      <div class="marquee__group">
        {#each partners.concat(partners) as partner}
          <a target="_BLANK" href={partner.url}><img src={partner.image} /></a>
        {/each}
      </div>

      <div aria-hidden="true" class="marquee__group">
        {#each partners.concat(partners) as partner}
          <a target="_BLANK" href={partner.url}><img src={partner.image} /></a>
        {/each}
      </div>
    </div>

    <div class="marquee marquee--partners-reverse">
      <div class="marquee__group">
        <svg>
          <use xlink:href="#ethereum" />
        </svg>
        <svg>
          <use xlink:href="#polygon" />
        </svg>
        <svg>
          <use xlink:href="#optimism" />
        </svg>
        <svg>
          <use xlink:href="#celo" />
        </svg>
        <svg>
          <use xlink:href="#avalanche" />
        </svg>
        <svg>
          <use xlink:href="#ethereum" />
        </svg>
        <svg>
          <use xlink:href="#polygon" />
        </svg>
        <svg>
          <use xlink:href="#optimism" />
        </svg>
        <svg>
          <use xlink:href="#celo" />
        </svg>
        <svg>
          <use xlink:href="#avalanche" />
        </svg>
      </div>

      <div aria-hidden="true" class="marquee__group">
        <svg>
          <use xlink:href="#ethereum" />
        </svg>
        <svg>
          <use xlink:href="#polygon" />
        </svg>
        <svg>
          <use xlink:href="#optimism" />
        </svg>
        <svg>
          <use xlink:href="#celo" />
        </svg>
        <svg>
          <use xlink:href="#avalanche" />
        </svg>
        <svg>
          <use xlink:href="#ethereum" />
        </svg>
        <svg>
          <use xlink:href="#polygon" />
        </svg>
        <svg>
          <use xlink:href="#optimism" />
        </svg>
        <svg>
          <use xlink:href="#celo" />
        </svg>
        <svg>
          <use xlink:href="#avalanche" />
        </svg>
      </div>
    </div>
  </article>

  <svg style="display: none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <symbol id="ethereum">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"
          xml:space="preserve"
          width="100%"
          height="100%"
          version="1.1"
          shape-rendering="geometricPrecision"
          text-rendering="geometricPrecision"
          image-rendering="optimizeQuality"
          fill-rule="evenodd"
          clip-rule="evenodd"
          viewBox="0 0 784.37 1277.39"
        >
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer" />
            <g id="_1421394342400">
              <g>
                <polygon
                  fill="#343434"
                  fill-rule="nonzero"
                  points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "
                />
                <polygon
                  fill="#8C8C8C"
                  fill-rule="nonzero"
                  points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "
                />
                <polygon
                  fill="#3C3C3B"
                  fill-rule="nonzero"
                  points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "
                />
                <polygon
                  fill="#8C8C8C"
                  fill-rule="nonzero"
                  points="392.07,1277.38 392.07,956.52 -0,724.89 "
                />
                <polygon
                  fill="#141414"
                  fill-rule="nonzero"
                  points="392.07,882.29 784.13,650.54 392.07,472.33 "
                />
                <polygon
                  fill="#393939"
                  fill-rule="nonzero"
                  points="0,650.54 392.07,882.29 392.07,472.33 "
                />
              </g>
            </g>
          </g>
        </svg>
      </symbol>

      <symbol id="optimism">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 500 500"
          style="enable-background:new 0 0 500 500;"
          xml:space="preserve"
        >
          <circle fill="#ff0420" cx="250" cy="250" r="250" />
          <path
            fill="#fff"
            d="M177.1,316.4c-14.9,0-27.1-3.5-36.6-10.5c-9.4-7.1-14.1-17.3-14.1-30.4c0-2.8,0.3-6.1,0.9-10.1  c1.6-9,3.9-19.8,6.9-32.5c8.5-34.4,30.5-51.6,65.9-51.6c9.6,0,18.3,1.6,25.9,4.9c7.6,3.1,13.6,7.9,18,14.3  c4.4,6.3,6.6,13.8,6.6,22.5c0,2.6-0.3,5.9-0.9,9.9c-1.9,11.1-4.1,22-6.8,32.5c-4.4,17.1-11.9,30-22.7,38.5  C209.5,312.3,195.1,316.4,177.1,316.4z M179.8,289.4c7,0,12.9-2.1,17.8-6.2c5-4.1,8.6-10.4,10.7-19c2.9-11.8,5.1-22,6.6-30.8  c0.5-2.6,0.8-5.3,0.8-8.1c0-11.4-5.9-17.1-17.8-17.1c-7,0-13,2.1-18,6.2c-4.9,4.1-8.4,10.4-10.5,19c-2.3,8.4-4.5,18.6-6.8,30.8  c-0.5,2.5-0.8,5.1-0.8,7.9C161.7,283.7,167.8,289.4,179.8,289.4z"
          />
          <path
            fill="#fff"
            d="M259.3,314.6c-1.4,0-2.4-0.4-3.2-1.3c-0.6-1-0.8-2.1-0.6-3.4l25.9-122c0.2-1.4,0.9-2.5,2.1-3.4  c1.1-0.9,2.3-1.3,3.6-1.3H337c13.9,0,25,2.9,33.4,8.6c8.5,5.8,12.8,14.1,12.8,25c0,3.1-0.4,6.4-1.1,9.8c-3.1,14.4-9.4,25-19,31.9  c-9.4,6.9-22.3,10.3-38.7,10.3h-25.3l-8.6,41.1c-0.3,1.4-0.9,2.5-2.1,3.4c-1.1,0.9-2.3,1.3-3.6,1.3H259.3z M325.7,242.9  c5.3,0,9.8-1.4,13.7-4.3c4-2.9,6.6-7,7.9-12.4c0.4-2.1,0.6-4,0.6-5.6c0-3.6-1.1-6.4-3.2-8.3c-2.1-2-5.8-3-10.9-3h-22.5l-7.1,33.6  H325.7z"
          />
        </svg>
      </symbol>

      <symbol id="polygon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 38.4 33.5"
          style="enable-background:new 0 0 38.4 33.5;"
          xml:space="preserve"
        >
          <g>
            <path
              fill="#8247e5"
              class="st0"
              d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0L5,16.3   c-0.7-0.4-1.2-1.2-1.2-2.1v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0L16,7.2c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7   c0-0.8-0.4-1.6-1.2-2.1l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7   c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1   L29,28.8c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5c-0.7-0.4-1.2-1.2-1.2-2.1V21l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7   c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1V17c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"
            />
          </g>
        </svg>
      </symbol>

      <symbol id="celo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Celo_Rings"
          x="0px"
          y="0px"
          viewBox="0 0 950 950"
          style="enable-background:new 0 0 950 950;"
          xml:space="preserve"
        >
          <path
            id="Bottom_Ring"
            fill="#fbcc5c"
            d="M375,850c151.9,0,275-123.1,275-275S526.9,300,375,300S100,423.1,100,575S223.1,850,375,850z   M375,950C167.9,950,0,782.1,0,575s167.9-375,375-375s375,167.9,375,375S582.1,950,375,950z"
          />
          <path
            id="Top_Ring"
            fill="#35d07f"
            d="M575,650c151.9,0,275-123.1,275-275S726.9,100,575,100S300,223.1,300,375S423.1,650,575,650z   M575,750c-207.1,0-375-167.9-375-375S367.9,0,575,0s375,167.9,375,375S782.1,750,575,750z"
          />
          <path
            id="Rings_Overlap"
            fill="#5ea33b"
            d="M587.4,750c26-31.5,44.6-68.4,54.5-108.1c39.6-9.9,76.5-28.5,108.1-54.5  c-1.4,45.9-11.3,91.1-29.2,133.5C678.5,738.7,633.3,748.6,587.4,750z M308.1,308.1c-39.6,9.9-76.5,28.5-108.1,54.5  c1.4-45.9,11.3-91.1,29.2-133.4c42.3-17.8,87.6-27.7,133.4-29.2C336.6,231.5,318,268.4,308.1,308.1z"
          />
        </svg>
      </symbol>

      <symbol id="avalanche">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1503 1504" fill="none">
          <rect x="287" y="258" width="928" height="844" fill="white" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1502.5 752C1502.5 1166.77 1166.27 1503 751.5 1503C336.734 1503 0.5 1166.77 0.5 752C0.5 337.234 336.734 1 751.5 1C1166.27 1 1502.5 337.234 1502.5 752ZM538.688 1050.86H392.94C362.314 1050.86 347.186 1050.86 337.962 1044.96C327.999 1038.5 321.911 1027.8 321.173 1015.99C320.619 1005.11 328.184 991.822 343.312 965.255L703.182 330.935C718.495 303.999 726.243 290.531 736.021 285.55C746.537 280.2 759.083 280.2 769.599 285.55C779.377 290.531 787.126 303.999 802.438 330.935L876.42 460.079L876.797 460.738C893.336 489.635 901.723 504.289 905.385 519.669C909.443 536.458 909.443 554.169 905.385 570.958C901.695 586.455 893.393 601.215 876.604 630.549L687.573 964.702L687.084 965.558C670.436 994.693 661.999 1009.46 650.306 1020.6C637.576 1032.78 622.263 1041.63 605.474 1046.62C590.161 1050.86 573.004 1050.86 538.688 1050.86ZM906.75 1050.86H1115.59C1146.4 1050.86 1161.9 1050.86 1171.13 1044.78C1181.09 1038.32 1187.36 1027.43 1187.92 1015.63C1188.45 1005.1 1181.05 992.33 1166.55 967.307C1166.05 966.455 1165.55 965.588 1165.04 964.706L1060.43 785.75L1059.24 783.735C1044.54 758.877 1037.12 746.324 1027.59 741.472C1017.08 736.121 1004.71 736.121 994.199 741.472C984.605 746.453 976.857 759.552 961.544 785.934L857.306 964.891L856.949 965.507C841.69 991.847 834.064 1005.01 834.614 1015.81C835.352 1027.62 841.44 1038.5 851.402 1044.96C860.443 1050.86 875.94 1050.86 906.75 1050.86Z"
            fill="#E84142"
          />
        </svg>
      </symbol>
    </defs>
  </svg>
</section>

<style lang="postcss">
  :root {
    --partners-color-text: #333;
    --partners-color-bg: #fff;
    --partners-color-bg-accent: #eee;
    --partners-size: clamp(10rem, 10rem, 30rem);
    --partners-gap: calc(var(--partners-size) / 14);
    --partners-duration: 60s;
    --partners-scroll-start: 0;
    --partners-scroll-end: calc(-100% - var(--partners-gap));
  }

  h3 {
    color: #333;
    font-weight: 800;
    @apply text-xl;

    @screen sm {
      @apply text-3xl;
    }
  }

  section {
    display: grid;
    align-content: center;
    overflow: hidden;
    gap: var(--partners-gap);
    width: 100%;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--partners-color-text);
    background-color: var(--partners-color-bg);
  }

  .marquee {
    display: flex;
    overflow: hidden;
    user-select: none;
    gap: var(--partners-gap);
    mask-image: linear-gradient(
      var(--partners-mask-direction, to right),
      hsl(0 0% 0% / 0),
      hsl(0 0% 0% / 1) 20%,
      hsl(0 0% 0% / 1) 80%,
      hsl(0 0% 0% / 0)
    );
  }

  .marquee__group {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: var(--partners-gap);
    min-width: 100%;
    animation: scroll-x var(--partners-duration) linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee__group {
      animation-play-state: paused;
    }
  }

  .marquee--partners-reverse .marquee__group {
    animation-direction: reverse;
    animation-delay: -3s;
  }

  @keyframes scroll-x {
    from {
      transform: translateX(var(--partners-scroll-start));
    }
    to {
      transform: translateX(var(--partners-scroll-end));
    }
  }

  @keyframes scroll-y {
    from {
      transform: translateY(var(--partners-scroll-start));
    }
    to {
      transform: translateY(var(--partners-scroll-end));
    }
  }

  .marquee svg,
  .marquee img {
    display: grid;
    place-items: center;
    width: var(--partners-size);
    fill: var(--partners-color-text);
    background: var(--partners-color-bg-accent);
    aspect-ratio: 16/9;
    padding: calc(var(--partners-size) / 10);
    border-radius: 0.5rem;
    object-fit: contain;
  }

  article {
    display: flex;
    flex-direction: column;
    gap: var(--partners-gap);
    margin: auto;
    max-width: 100vw;
  }

  @keyframes fade {
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
</style>
