<script context="module">
	import { HIGHLIGHTS, LEVELS, TYPES } from '$lib/values/course.js';

	/**
	 * This returns a list of tags for the course.
	 * @param course {Course} - The course data.
	 * @returns {{ name: string, style: string }[]}
	 */
	function getTagList(course) {
		const tags = [];
		course.highlights?.forEach((hl) => hl && tags.push(HIGHLIGHTS[hl]));
		if (course.level) {
			const { name, style } = LEVELS[course.level];
			tags.push({ name: name + '課程', style });
		}
		if (course.type) tags.push({ name: TYPES[course.type].name, style: 'bg-gray-300' });
		return tags;
	}
</script>

<script>
	import Icon from '@iconify/svelte';
	import Card from '$lib/components/Card.svelte';

	/** @type {Card} */
	let card;

	/** The indicators of the card expanded state. */
	let expanded = false,
		transitioning = 0;

	/** This is the selected state of the card. */
	export let selected = false;

	/** @type {Course} */
	export let course;

	/** The class names to add to the Card. */
	let className = '';
	export { className as class };
</script>

<Card bind:this={card} class={className} bind:expanded bind:transitioning expandable>
	{#if course}
		<header
			class="p-2 pb-2 transition-[padding_0.2s]"
			class:p-3={expanded || transitioning === 1}
			on:click={() => card.expand()}
		>
			<div class="flex flex-wrap justify-center">
				<div class="grow">
					<div class="m-1 flex flex-wrap gap-2 pb-1">
						{#each getTagList(course) as tag}
							<span class="badge mr-0 font-medium {tag.style}">{tag.name}</span>
						{/each}
					</div>
					<h1 class="m-1 text-2xl font-medium">{course.name}</h1>
					<div class="m-1 flex flex-wrap">
						{#if course.lecturer}
							<span class="sep-dot text-sm">{course.lecturer} 老師</span>
						{/if}
						{#if course.room}
							<span class="sep-dot text-sm">{course.room}</span>
						{/if}
						{#if course.time}
							<span class="sep-dot text-sm">{course.time.prettyPrint()}</span>
						{/if}
					</div>
				</div>
				<div class="flex items-center justify-center xl:w-1/6">
					<button
						class="flex items-center rounded-xl p-2 px-4 text-gray-700 hover:bg-gray-200/50"
						class:text-red-500={selected}
						on:click|stopPropagation={() => (selected = !selected)}
					>
						{#if selected}
							<span class="whitespace-nowrap">移除</span>
							<Icon icon="mdi:close-circle-outline" class="ml-1.5 mt-0.5 text-xl" />
						{:else}
							<span class="whitespace-nowrap">選擇</span>
							<Icon icon="mdi:plus-circle-outline" class="ml-1.5 mt-0.5 text-xl" />
						{/if}
					</button>
				</div>
			</div>
		</header>
	{/if}
	{#if expanded || transitioning}
		<main class="p-2 transition-[padding_0.2s]" class:p-3={expanded || transitioning === 1}>
			<div class="pb-2">
				{#if course.lecturers.length > 1}
					<p class="m-1">
						授課教師：
						{#each course.lecturers.slice(0, -1) as lecturer}
							<span class="whitespace-nowrap">{lecturer}、</span>
						{/each}
						<span class="whitespace-nowrap">{course.lecturers[course.lecturers.length - 1]}</span>
					</p>
				{/if}
				{#if course.class}
					<p class="m-1">上課班組：{course.class}</p>
				{/if}
			</div>
			<p class="m-1">{course.abstract}</p>
			<div class="card m-1 mt-4 bg-gray-200 p-2 text-sm shadow-none">
				<h1 class="mb-0.5 text-xs font-medium text-gray-700">課表備註</h1>
				<p class="text-sm">{course.remark}</p>
			</div>
		</main>
		<footer class="p-2 transition-[padding_0.2s]" class:p-3={expanded || transitioning === 1}>
			<div class="m-1 flex">
				{#if course.semester}
					<span class="sep-slash text-xs">{course.semester}</span>
				{/if}
				{#if course.weeks}
					<span class="sep-slash text-xs">{course.weeks}</span>
				{/if}
				{#if course.credits}
					<span class="sep-slash text-xs">{course.credits} 學分</span>
				{/if}
			</div>
		</footer>
	{/if}
</Card>

<style lang="postcss">
	.sep-dot {
		@apply after:m-1 after:content-['‧'] after:last:content-none;
	}

	.sep-slash {
		@apply after:m-1 after:content-['/'] after:last:content-none;
	}
</style>
