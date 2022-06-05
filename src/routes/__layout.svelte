<script>
	import '../app.css';
	import Icon from '@iconify/svelte';
	import AppBar from '$lib/components/AppBar.svelte';
	import CourseCard from '$lib/components/CourseCard.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import TimeTable from '$lib/components/TimeTable.svelte';
	import { APP_NAME } from '$lib/js/app.js';

	/** This is the course data. */
	const courses = [];

	/** This contains the selected courses. */
	let selected = [];

	/** The sets the active view. */
	let active = 'filter';
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

<div class="relative mx-2 h-full overflow-hidden xl:flex">
	<div
		class:!top-0={active === 'filter'}
		class="absolute top-full z-20 h-full w-full pb-2 transition-all xl:static xl:w-2/12"
	>
		<div class="h-full shadow-lg shadow-gray-200">
			<Filter />
		</div>
	</div>
	<div
		class:opacity-0={active !== ''}
		class="relative mx-2 h-full grow overflow-hidden rounded-lg transition-all xl:opacity-100"
	>
		<div class="flex h-full flex-col gap-4 overflow-y-auto pb-4">
			{#each courses as course}
				<CourseCard {course} />
			{/each}
		</div>
	</div>
	<div
		class:!top-0={active === 'timetable'}
		class="absolute top-full z-20 h-full w-full pb-2 transition-all xl:static xl:w-4/12"
	>
		<div class="card flex h-full flex-col overflow-hidden p-1 shadow-xl shadow-gray-200">
			<div class="grow"><TimeTable {selected} /></div>
			<div class="card m-2 flex flex h-1/6 max-h-14 items-center justify-center border">
				<p class="text-center text-sm font-medium">
					已選學分：{selected.reduce((a, c) => a + c.credits, 0)}
				</p>
			</div>
		</div>
	</div>
</div>

<div class="fixed bottom-0 right-0 left-0 h-14 xl:hidden">
	<div
		class="flex h-full items-center justify-around gap-2 border-t bg-white px-2 shadow-xl shadow-gray-200"
	>
		{#if active === 'filter'}
			<button class="p-2" on:click={() => (active = '')}>
				<Icon icon="mdi:chevron-down" class="text-xl" />
			</button>
		{:else}
			<button class="p-2" on:click={() => (active = 'filter')}>
				<Icon icon="mdi:search" class="text-xl" />
			</button>
		{/if}
		{#if active === 'timetable'}
			<button class="p-2" on:click={() => (active = '')}>
				<Icon icon="mdi:chevron-down" class="text-xl" />
			</button>
		{:else}
			<button class="p-2" on:click={() => (active = 'timetable')}>
				<Icon icon="mdi:timetable" class="text-xl" />
			</button>
		{/if}
	</div>
</div>

<slot />

<style lang="postcss">
	:global(body) {
		@apply pb-14 xl:pb-0;
	}
</style>
