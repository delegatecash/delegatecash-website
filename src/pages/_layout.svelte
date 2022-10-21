<script>
  import { onMount } from 'svelte';
  import Header from '~/components/Header.svelte';

  const onEthereumChange = () => {
    //clear wallet signature if account is changed
    localStorage.clear();
    window.location.reload();
  };

  onMount(() => {
    // @ts-ignore
    window.ethereum?.on('accountsChanged', onEthereumChange);
    // @ts-ignore
    window.ethereum?.on('chainChanged', onEthereumChange);

    //watch for tamper in wallet signature
    window.addEventListener('storage', e => {
      if (e.key === 'signature' && e.oldValue !== null) window.location.reload();
    });
  });
</script>

<Header />

<div class="container mx-auto px-4 text-center">
  <h1 class="text-3xl font-bold">Delegation Registry</h1>
  <p class="mt-3 mb-10">
    Keep your vaulted NFTs safe. Claim airdrops, prove ownership, and more from your hot wallet.
  </p>
  <slot />
</div>
