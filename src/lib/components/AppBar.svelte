<script>
	/** App bar title. */
	export let title = '';
</script>

<nav class="fixed top-0 left-0 right-0 bg-gray-100">
	<div class="flex h-14 items-center">
		<h1 class="ml-4 text-xl font-medium">{title}</h1>
	</div>
</nav>

<style>
	:global(body) {
		@apply pt-14;
	}
</style>
