<script>
	/** App bar title. */
	export let title = '';
</script>

<header class="fixed top-0 left-0 right-0">
	<div class="flex h-14 items-center">
		<h1 class="mx-2 grow pl-2 text-xl font-medium">{title}</h1>
		<div class="mx-2 shrink-0"><slot /></div>
	</div>
</header>

<style>
	:global(body) {
		@apply pt-14;
	}
</style>
