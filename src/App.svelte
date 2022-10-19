<!-- src/App.svelte -->
<script>
  import { Router } from '@roxi/routify';
  import { routes } from '../.routify/routes';
  import './main.css';
</script>

<Router {routes} />
