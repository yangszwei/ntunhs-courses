<script>
	import TimeTable from '$lib/components/TimeTable.svelte';

	/** @type {Course[]} */
	export let courses = [];

	/** The class names to add to the component. */
	let className = '';
	export { className as class };
</script>

<div class="card flex h-full flex-col overflow-hidden {className}">
	<div class="bg-blue-500 p-1 text-white" on:touchstart on:touchmove|preventDefault on:touchend>
		<span class="mx-auto my-0.5 block h-1 w-10 rounded-full bg-blue-200 xl:hidden" />
		<h1 class="my-1 text-center text-sm font-medium">課表預覽</h1>
	</div>
	<TimeTable {courses} class="grow shadow-none" />
	<div class="card m-2 flex h-1/6 max-h-14 items-center justify-center bg-gray-200 shadow-none">
		<p class="text-sm font-medium">已選學分：{courses.reduce((a, c) => a + c.credits, 0)}</p>
	</div>
</div>
