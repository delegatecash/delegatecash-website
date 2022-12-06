<script lang="ts">
  import { onMount } from 'svelte';
  import { params } from '@roxi/routify';
  import { submitTransaction, getDelegations } from '~/utils';
  import { wallet } from '~/stores/wallet';
  import { delegatecash } from '~/stores/delegatecash';
  import { initialWalkthrough } from '~/stores/initialWalkthrough';
  import Card from '~/design-system/Card.svelte';
  import TextInput from '~/design-system/inputs/TextInput.svelte';
  import HorizontalPicker from '~/design-system/HorizontalPicker.svelte';
  import NoticeContainer from '~/design-system/NoticeContainer.svelte';
  import Button from '~/design-system/Button.svelte';
  import RegistryTableByWallet from '~/components/RegistryTableByWallet/RegistryTableByWallet.svelte';
  import InitialWalkthrough from '~/components/InitialWalkthrough/InitialWalkthrough.svelte';
  import MainSection from '~/components/MainPage/MainSection.svelte';
  import Stats from '~/components/MainPage/Stats.svelte';
  import Partners from '~/components/MainPage/Partners.svelte';
  import Integrations from '~/components/MainPage/Integrations/Integrations.svelte';
  import CallToAction from '~/components/MainPage/CallToAction.svelte';

  $: optionValue = 0;

  $: noticeContainerInfo = (() => {
    switch (optionValue) {
      case 0:
        return {
          description:
            'Entrust a throwaway burner wallet (eg. your hot wallet) to prove ownership on your behalf for any contract.',
        };
      case 1:
        return {
          description:
            'Entrust an entire contract to a wallet of your choice (eg. an ERC20 token).',
        };
      case 2:
        return {
          description: 'Entrust a single NFT to a wallet of your choice.',
        };
    }
  })();

  $: loading = true;
  $: delegations = [];

  $: delegateInput = '';
  $: contractInput = '';
  $: tokenIdInput = '';

  $: viewRecentDelegations = typeof $params?.recent !== 'undefined';

  $: isFormValid = (() => {
    if (delegateInput.toLocaleLowerCase() === $wallet.currentWallet) return false;
    switch (optionValue) {
      case 0:
        return delegateInput.length === 42;
      case 1:
        return delegateInput.length === 42 && contractInput.length === 42;
      case 2:
        return (
          delegateInput.length === 42 && contractInput.length === 42 && tokenIdInput.length > 0
        );
      default:
        return false;
    }
  })();

  const onHorizontalPickerChange = e => {
    const newValue = e.detail;
    if (newValue < 2) tokenIdInput = '';
    if (newValue == 0) contractInput = '';
    optionValue = newValue;
  };

  const submitDelegation = () => {
    try {
      switch (optionValue) {
        case 0:
          submitTransaction('Delegating wallet', 'Wallet delegated', $delegatecash.delegateForAll, [
            delegateInput,
            true,
          ]);
          break;
        case 1:
          submitTransaction(
            'Delegating contract',
            'Contract delegated',
            $delegatecash.delegateForContract,
            [delegateInput, contractInput, true],
          );
          break;
        case 2:
          submitTransaction(
            `Delegating NFT #${tokenIdInput}`,
            `NFT #${tokenIdInput} delegated`,
            $delegatecash.delegateForToken,
            [delegateInput, contractInput, tokenIdInput, true],
          );
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  wallet.subscribe(async walletStore => {
    if (walletStore.isConnected) {
      delegations = await getDelegations(walletStore.currentWallet);
      loading = false;
    }
  });

  // Change the tab so it forces the user to interact with it
  initialWalkthrough.subscribe(initialWalkthroughStore => {
    if (initialWalkthroughStore.activeItem === 3) {
      optionValue = 1;
    }
  });

  onMount(() => {
    const { delegate, contract, tokenId, walkthrough } = $params;

    delegateInput = delegate || '';
    contractInput = contract || '';
    tokenIdInput = tokenId || '';

    if (contract && tokenId) {
      optionValue = 2;
    } else if (contract) {
      optionValue = 1;
    }

    //
    if (typeof walkthrough !== 'undefined') {
      initialWalkthrough.turnOn();
    }
  });
</script>

<InitialWalkthrough {optionValue} {isFormValid} />

<MainSection
  subHeader="Delegate Cash"
  title="A decentralized registry to protect your assets."
  subtitle="Keep your vaulted NFTs safe. Claim airdrops, prove ownership, and more from your hot wallet."
>
  <div slot="left">
    <Button on:click={() => initialWalkthrough.turnOn()}>Delegate your first wallet!</Button>
  </div>

  <div slot="right" id="main_widget_container" class="text-center">
    <Card>
      {#if viewRecentDelegations}
        <div class="text-xl h-80 text-left p-5 pb-0 overflow-scroll">
          <h2 class="font-bold">Recent Delegations</h2>
          <div class="text-left mb-5">
            <a class="text-gray-900" href="/">&larr; Delegate another wallet</a>
          </div>
          <RegistryTableByWallet {loading} data={delegations} showRevoke={false} shadow={false} />
        </div>
      {:else}
        <div class="p-2">
          <HorizontalPicker
            value={optionValue}
            options={['Wallet', 'Contract', 'NFT']}
            on:click={e => onHorizontalPickerChange(e)}
          />
          <NoticeContainer>{noticeContainerInfo.description}</NoticeContainer>
          <TextInput
            bind:value={delegateInput}
            id="delegate"
            label="Delegate Wallet"
            placeholder="Example: Your hot wallet"
          />

          {#if delegateInput.toLocaleLowerCase() === $wallet.currentWallet}
            <p>The wallet is identical to your connected wallet.</p>
          {/if}

          {#if optionValue == 1}
            <TextInput
              bind:value={contractInput}
              id="contract"
              label="Contract"
              placeholder="Example: ERC20 token address"
            />
          {/if}
          {#if optionValue == 2}
            <div class="float-right w-24">
              <TextInput
                type="number"
                bind:value={tokenIdInput}
                id="tokenid"
                label="Token ID"
                placeholder="#"
              />
            </div>
            <div class="pr-3 overflow-hidden">
              <TextInput
                bind:value={contractInput}
                id="contract"
                label="Contract"
                placeholder="Address of NFT project"
              />
            </div>
          {/if}

          <div class="mt-3">
            <Button
              size="md"
              isFullWidth
              disabled={!$wallet.isConnected || !isFormValid}
              on:click={() => {
                initialWalkthrough.reset();
                submitDelegation();
              }}
            >
              {#if $wallet.isConnected}
                Submit Delegation
              {:else}
                Connect your vault, like a Ledger, first
              {/if}
            </Button>
          </div>
        </div>
      {/if}
    </Card>

    {#if $wallet.isConnected}
      {#if viewRecentDelegations}
        <a class:disabled={!$wallet.isConnected} href="/{$wallet.currentWallet || ''}">
          Need to revoke delegations?
        </a>
      {:else}
        <a href="/?recent">View recent delegations </a>
      {/if}
    {/if}
  </div>

  <svg
    slot="right-background"
    class="absolute top-0 left-0 w-full h-full xl:rounded-l-3xl"
    width="769"
    height="459"
    viewBox="0 0 769 459"
    fill="none"
    preserveAspectRatio="xMinYMin slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_126_343)">
      <path d="M769.413 -0.408936H6.42887V432.012H769.413V-0.408936Z" fill="#97E7E4" />
      <path
        d="M446.426 183.784C375.298 176.679 307.498 210.721 239.77 233.763C216.497 241.686 191.804 248.432 167.587 244.251C128.863 237.566 99.838 204.383 81.6275 169.309C63.417 134.235 52.6023 95.3984 31.8454 61.7963C23.3945 48.1081 12.4683 35.0435 -0.365318 25.4341V459.429H605.826C619.927 401.538 620.496 339.813 594.555 286.982C566.757 230.4 508.798 190.01 446.426 183.784Z"
        fill="#C0FDFB"
      />
      <path
        d="M834.335 -14.4651C808.728 17.0413 794.545 56.1841 781.103 94.5908C767.661 132.998 754.127 172.263 729.464 204.536C704.812 236.809 666.544 261.446 626.218 258.727C547.228 253.391 495.406 165.577 421.621 142.31C397.871 134.817 370.094 135.778 350.291 150.959C322.584 172.192 319.348 215.352 335.012 246.674C350.676 277.997 380.655 299.413 411.232 316.168C434.718 329.039 459.259 339.946 484.521 348.758C516.356 359.85 550.86 368.498 574.711 392.471C604.943 422.863 598.745 446.651 582.147 468.773H918.742V-49.1304H872.348C858.115 -39.4903 845.22 -27.8569 834.335 -14.4651Z"
        fill="#3083DC"
      />
      <path
        d="M837.003 188.374C814.186 219.604 779.165 240.878 735.45 252.021C717.006 256.723 697.771 259.872 681.184 269.133C664.596 278.395 650.89 295.784 652.97 314.318C655.527 337.074 680.037 351.273 703.087 354.892C751.571 362.498 806.161 354.831 839.742 315.432C865.886 284.754 875.605 241.716 904.691 213.859C932.854 186.892 975.565 177.855 1000 147.422C1012.88 131.382 1019.23 110.937 1022.37 90.5528C1026.83 61.6839 1025.12 31.0464 1012.07 4.95802C999.01 -21.1201 973.241 -41.7496 944.297 -43.3954C868.412 -47.6992 868.97 49.4166 866.281 100.806C864.476 135.604 854.209 164.821 837.003 188.374Z"
        fill="#3067D2"
      />
      <path
        d="M44.0906 6.14387C24.6322 -11.8788 12.8233 -37.548 8.53194 -68.4513C6.71597 -81.4955 6.02609 -94.9588 0.983969 -107.052C-4.05815 -119.156 -14.812 -129.88 -27.5238 -129.828C-43.127 -129.757 -54.5808 -113.963 -58.7505 -98.3732C-67.5159 -65.5889 -66.3898 -27.4582 -42.1936 -1.43116C-23.3542 18.8405 5.0826 28.7259 21.7815 50.8069C37.9528 72.1826 40.8949 102.248 59.6938 121.323C69.5954 131.372 82.9768 137.26 96.551 140.951C115.776 146.164 136.665 147.268 155.301 140.235C173.948 133.202 189.835 117.009 193.102 97.2181C201.665 45.3378 135.833 38.4886 101.218 32.815C77.8028 28.9712 58.7706 19.7299 44.0906 6.14387Z"
        fill="#3083DC"
      />
      <g opacity="0.71">
        <path
          opacity="0.71"
          d="M723.1 391.633C736.998 388.999 746.147 375.511 743.533 361.506C740.92 347.501 727.534 338.282 713.636 340.916C699.737 343.549 690.588 357.037 693.202 371.042C695.815 385.047 709.201 394.266 723.1 391.633Z"
          fill="#97E7E4"
        />
      </g>
      <g opacity="0.65">
        <path
          opacity="0.65"
          d="M202.699 239.672C204.221 253.84 194.056 266.568 179.995 268.101C165.933 269.634 153.303 259.391 151.781 245.223C150.259 231.054 160.425 218.327 174.486 216.793C188.547 215.26 201.178 225.503 202.699 239.672Z"
          fill="#69779B"
        />
      </g>
      <path
        d="M678.365 179.997C690.952 153.383 679.744 121.526 653.333 108.843C626.921 96.1592 595.306 107.452 582.718 134.066C570.131 160.68 581.338 192.537 607.75 205.22C634.162 217.904 665.777 206.611 678.365 179.997Z"
        fill="#C0FDFB"
      />
      <g opacity="0.72">
        <path
          opacity="0.72"
          d="M497.35 355.451C518.039 334.604 518.039 300.804 497.35 279.957C476.661 259.109 443.118 259.109 422.429 279.956C401.74 300.804 401.74 334.604 422.429 355.451C443.118 376.298 476.661 376.298 497.35 355.451Z"
          fill="#97E7E4"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_126_343">
        <rect width="769" height="459" fill="white" />
      </clipPath>
    </defs>
  </svg>
</MainSection>

<div class="h-10 md:h-12 lg:h-16" />

<Stats />

<div class="h-10 md:h-12 lg:h-16" />

<Partners />

<div class="h-10 md:h-12 lg:h-20" />

<Integrations />

<div class="h-10 md:h-12 lg:h-20" />

<CallToAction />

<style lang="postcss">
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
