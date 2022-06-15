<script>
	import TimeTable from '$lib/components/TimeTable.svelte';

	/** @type {Course[]} */
	export let courses = [];

	/** The class names to add to the component. */
	let className = '';
	export { className as class };
</script>

<div class="h-full p-4 pt-0">
	<div class="card flex h-full flex-col overflow-hidden bg-green-500 {className}">
		<div on:touchstart on:touchmove|preventDefault on:touchend>
			<h1 class="my-2 text-center text-sm font-medium text-white">課表預覽</h1>
		</div>
		<div class="card m-1.5 mt-0 flex grow flex-col shadow-none">
			<TimeTable {courses} class="mx-2 grow shadow-none" />
			<div class="card m-2 flex h-1/6 max-h-14 items-center justify-center bg-gray-200 shadow-none">
				<p class="text-sm font-medium">已選學分：{courses.reduce((a, c) => a + c.credits, 0)}</p>
			</div>
		</div>
	</div>
</div>
