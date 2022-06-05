<script>
	import { fly } from 'svelte/transition';
	import Card from '$lib/components/Card.svelte';
	import { HIGHLIGHT, LEVEL } from '$lib/js/course.js';

	let card,
		expanded = 0,
		shrunk = true;

	/** @type {import('$lib/js/course.js').Course} */
	export let course;
</script>

<Card
	bind:this={card}
	bind:expanded
	on:expand={() => (shrunk = false)}
	on:shrink={() => (shrunk = true)}
>
	{#if course}
		<header
			class="p-2 pb-2 transition-all duration-200"
			class:p-3={!shrunk}
			on:click={() => card.expand()}
		>
			<div class="m-1 flex items-center">
				<p class="flex flex-wrap gap-2 pb-1">
					{#each course.highlights as key}
						<span class="badge mr-0 font-medium {HIGHLIGHT[key].style}">{HIGHLIGHT[key].name}</span>
					{/each}
					{#if course.level}
						<span class="badge mr-0 font-medium {LEVEL[course.level].style}">
							{LEVEL[course.level].name}
						</span>
					{/if}
					{#if course.type}
						<span class="badge mr-0 bg-gray-300 font-medium ">{course.type}</span>
					{/if}
				</p>
			</div>
			<h1 class="m-1 text-2xl font-medium">{course.name}</h1>
			<p class="separator-dot m-1">
				{#if course.lecturer}
					<span>{course.lecturer} 老師</span>
				{/if}
				{#if course.room}
					<span>{course.room}</span>
				{/if}
				{#if course.time}
					<span>{@html course.time.prettyPrint()}</span>
				{/if}
			</p>
		</header>
	{/if}
	{#if expanded}
		<main
			class="p-2 transition-all duration-200"
			class:px-3={!shrunk}
			in:fly={{ duration: 500, y: -30 }}
		>
			<div class="pb-2">
				{#if course.lecturers.length > 1}
					<p class="m-1">
						<span class="font-medium">授課教師</span>：{@html course.lecturers
							.map((s) => `<span>${s}</span>`)
							.join('、')}
					</p>
				{/if}
				{#if course.class}
					<p class="m-1">上課班組：{course.class}</p>
				{/if}
			</div>
			<p class="m-1">{course.abstract}</p>
			<div class="m-1 mt-4 rounded-xl bg-gray-200 p-2 text-sm">
				<h1 class="mb-0.5 text-xs font-medium text-gray-600">課表備註</h1>
				<p>{course.remark}</p>
			</div>
		</main>
		<footer
			class="p-2 pt-2 transition-all duration-200"
			class:p-3={!shrunk}
			in:fly={{ duration: 500, y: -30 }}
		>
			<p class="separator-slash m-1 text-sm">
				{#if course.semester}
					<span>{course.semester}</span>
				{/if}
				{#if course.weeks}
					<span>{course.weeks}</span>
				{/if}
				{#if typeof course.credits === 'number'}
					<span>{course.credits} 學分</span>
				{/if}
			</p>
		</footer>
	{/if}
</Card>
