<script>
	import '../app.css';
	import AppBar from '$components/AppBar.svelte';
	import { APP_NAME } from '$lib/js/app.js';
</script>

<svelte:head>
	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<AppBar title={APP_NAME} />

<slot />
