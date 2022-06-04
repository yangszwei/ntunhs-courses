<script>
	import Icon from '@iconify/svelte';
	import { SESSIONS, WEEKDAYS } from '$lib/js/course.js';

	/** The contains the filter value. */
	const filter = {
		keywords: '',
		weekdays: [],
		sessions: [],
	};
</script>

<div class="card h-full">
	<header class="mx-2 flex h-14">
		<input
			type="text"
			bind:value={filter.keywords}
			placeholder="以課程主題或班級名稱搜尋"
			class="m-2 grow border-b text-lg leading-10 outline-0"
		/>
		<button class="p-2">
			<Icon icon="mdi:search" class="text-xl" />
		</button>
	</header>
	<main class="mx-2">
		<div class="card border">
			<h1 class="p-2 pb-0 text-sm font-medium">上課時間</h1>
			<div class="flex gap-2 overflow-auto p-2 md:flex-wrap">
				{#each WEEKDAYS as name, value}
					<label
						class:checked={filter.weekdays.includes(value)}
						class="badge mr-0 whitespace-nowrap border text-base"
					>
						<span>週{name}</span>
						<input type="checkbox" bind:group={filter.weekdays} {value} class="hidden" />
					</label>
				{/each}
			</div>
			<div class="flex max-h-48 flex-col gap-2 overflow-auto p-2">
				{#each SESSIONS as [start, end], value}
					<label
						class:checked={filter.sessions.includes(value)}
						class="badge mr-0 flex items-center border text-base"
					>
						<span class="mx-1 whitespace-nowrap">第{value + 1}節</span>
						<span class="ml-auto mr-1 text-xs">{start} ~ {end}</span>
						<input type="checkbox" bind:group={filter.sessions} {value} class="hidden" />
					</label>
				{/each}
			</div>
		</div>
		<!-- TODO: add more options -->
	</main>
</div>

<style>
	.checked {
		@apply bg-gray-500 text-white;
	}
</style>
