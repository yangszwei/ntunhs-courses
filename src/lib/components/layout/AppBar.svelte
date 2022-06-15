<script>
	import { APP_NAME, APP_SHORT_NAME } from '$lib/values/app.js';

	/** The className to add to the component. */
	let className = '';
	export { className as class };
</script>

<header class="fixed inset-x-0 top-0 z-10 bg-gray-50">
	<div class="center h-14">
		<div class="mx-2 grow">
			<a class="center gap-2 p-1 text-xl font-medium" href="/">
				<img src="/images/favicon-192x192.png" alt="${APP_SHORT_NAME}" class="h-8 w-8" />
				<span class="hidden lg:block">{APP_NAME}</span>
				<span class="lg:hidden">{APP_SHORT_NAME}</span>
			</a>
		</div>
		<div class="mx-2 shrink-0 {className}">
			<slot />
		</div>
	</div>
</header>

<style>
	:global(body) {
		@apply pt-14;
	}
</style>
