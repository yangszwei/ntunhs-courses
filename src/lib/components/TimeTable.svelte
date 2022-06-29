<script context="module">
	import { LEVELS, SESSIONS } from '$lib/values/course.js';
	import { WEEKDAYS } from '$lib/values/common.js';

	/** This is the number of sessions per day. */
	const num = Object.keys(SESSIONS).length;

	/**
	 * This builds a tabular presentation of the course data.
	 * @param courses {Course[]} - The course data.
	 * @returns {{ start: number, end?: number, course?: Course, level?: Object, rowspan?: number }[][]}
	 */
	function build(courses) {
		/** This is the tabular presentation of the data. */
		let table = new Array(num + 1).fill(null).map(() => new Array(WEEKDAYS.length));
		/** This sets the table headers. */
		table[0] = WEEKDAYS;
		/** This sets the table headers. */
		for (const course of courses) {
			for (const { day, start, end } of course.sessions.group()) {
				const s = parseInt(start, 16),
					e = parseInt(end, 16);
				table[s][day] = {
					start,
					end,
					course,
					level: LEVELS[course.level],
					rowspan: e - s + 1,
				};
				for (let i = s + 1; i <= e; i++) table[i][day] = { start: -1 };
			}
		}
		/** This trims the empty sections from the table. */
		if (table.slice(1).every((x) => !x[0] && !x[6])) table = table.map((x) => x.slice(1, -1));
		if (table.slice(11, 15).every((x) => x.every((y) => !y))) table.splice(11, 15);
		return table;
	}
</script>

<script>
	/** This is the tabular presentation of the course data. */
	let data;

	/**
	 * The course data.
	 * @type {Course[]}
	 * */
	export let courses = [];

	/** The class names to add to the TimeTable component. */
	let className = '';
	export { className as class };

	/** This rebuilds the data on courses change. */
	$: data = build(courses);
</script>

<div class="card h-full overflow-auto {className}">
	<div class="h-full p-1 pt-0">
		{#if data}
			<table class="h-full w-full text-center text-xs">
				<tr class="h-6">
					<td class="whitespace-nowrap">節次</td>
					{#each data[0] as weekday}
						<th class="h-8 font-normal [min-width:2rem]">{weekday}</th>
					{/each}
				</tr>
				{#each data.slice(1) as weekdays, session}
					<tr class="border-t border-gray-100">
						<td class="font-medium text-gray-500">{session + 1}</td>
						{#each weekdays as item}
							{#if item && item.start > 0}
								<td class="p-1 px-0.5" rowspan={item.rowspan}>
									<div class="card h-full p-1.5 text-left {item.level.style}">
										<p class="mb-1 font-medium">{item.course.name}</p>
										<p>
											<span class="whitespace-nowrap">{SESSIONS[item.start].time[0]}</span> ~
											<span class="whitespace-nowrap">{SESSIONS[item.end].time[1]}</span>
										</p>
									</div>
								</td>
							{:else if !item || item.start !== -1}
								<td />
							{/if}
						{/each}
					</tr>
				{/each}
			</table>
		{/if}
	</div>
</div>
