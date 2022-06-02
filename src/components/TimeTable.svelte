<script>
	import { LEVEL, WEEKDAYS, SESSIONS } from '$lib/js/course.js';

	/**
	 * This build the tabular presentation of the course data.
	 * @param courses {Course[]} - The course data.
	 * @returns {{ start: number, end?: number, course?: Course, level?: object }[][]}
	 * */
	function build(courses) {
		let result = new Array(SESSIONS.length + 1)
			.fill(null)
			.map(() => new Array(WEEKDAYS.length).fill(null));
		result[0] = WEEKDAYS;
		for (const course of courses) {
			for (const { day, start, end } of course.time.group()) {
				result[start][day] = {
					course,
					start,
					end,
					level: LEVEL[course.level],
				};
				for (let i = start + 1; i <= end; i++) result[i][day] = { start: -1 };
			}
		}
		if (result.slice(1).every((x) => !x[0] && !x[6])) result = result.map((x) => x.slice(1, -1));
		if (result.slice(11, 15).every((x) => x.every((y) => !y))) result.splice(11, 15);
		return result;
	}

	/** Tabular presentation of the course data. */
	let data;

	/** @type {Course[]} */
	export let courses = [];

	$: data = build(courses);
</script>

<div class="card h-full overflow-auto bg-white">
	<div class="h-full p-1 pt-0 ">
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
								<td class="p-1 px-0.5" rowspan={item.end - item.start + 1}>
									<div class="card h-full p-1.5 text-left {item.level.style}">
										<p class="mb-1 font-medium">{item.course.name}</p>
										<p>
											<span class="whitespace-nowrap">{SESSIONS[item.start - 1][0]}</span> ~
											<span class="whitespace-nowrap">{SESSIONS[item.end - 1][1]}</span>
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
