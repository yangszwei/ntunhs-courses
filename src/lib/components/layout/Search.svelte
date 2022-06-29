<script context="module">
	import { SESSIONS, TYPES } from '$lib/values/course.js';
	import { WEEKDAYS } from '$lib/values/common.js';
</script>

<script>
	/** This is the filter values. */
	export const value = Object.seal({
		search: '',
		types: [],
		weekdays: [],
		sessions: [],
	});
</script>

<div class="h-full p-4 pt-0">
	<div class="card h-full overflow-auto">
		<header class="flex h-14 shrink-0 items-center border-b">
			<input
				type="text"
				class="w-full p-2 outline-0"
				bind:value={value.search}
				placeholder="以課程名稱、主題或班級名稱搜尋"
			/>
		</header>
		<main class="grow overflow-auto">
			<div class="p-2">
				<h1 class="mb-3 text-xs font-medium">課程類別</h1>
				<div class="flex flex-wrap justify-center gap-2">
					{#each Object.keys(TYPES) as type}
						<label
							class:selected={value.types.includes(type)}
							class="badge grow border-2 p-2 text-center text-sm text-gray-500"
						>
							<input type="checkbox" class="hidden" bind:group={value.types} value={type} />
							{TYPES[type].name}
						</label>
					{/each}
				</div>
			</div>
			<div class="p-2">
				<h1 class="mb-3 text-xs font-medium">上課時間</h1>
				<div class="mb-3 flex gap-2 overflow-auto">
					{#each WEEKDAYS as name, day}
						<label
							class:selected={value.weekdays.includes(day)}
							class="badge grow border-2 p-2 text-center text-sm text-gray-500"
						>
							<input type="checkbox" class="hidden" bind:group={value.weekdays} value={day} />
							{name}
						</label>
					{/each}
				</div>
				<div
					class="card flex max-h-64 flex-wrap justify-center gap-2 overflow-auto border p-2 shadow-none"
				>
					{#each Object.keys(SESSIONS) as s}
						<label
							class:selected={value.sessions.includes(s)}
							class="badge grow border-2 p-2 text-center text-sm text-gray-500"
						>
							<input type="checkbox" class="hidden" bind:group={value.sessions} value={s} />
							<span>第{SESSIONS[s].name}節</span>
							(<span>{SESSIONS[s].time[0]}</span> ~ <span>{SESSIONS[s].time[1]}</span>)
						</label>
					{/each}
				</div>
			</div>
		</main>
	</div>
</div>

<style>
	.selected {
		@apply border-green-500 text-black;
	}
</style>
