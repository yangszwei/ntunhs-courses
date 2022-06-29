<script context="module">
	import { LEVELS, POPULAR, TYPES } from '$lib/values/course.js';

	function tags(course) {
		const tags = [];
		if (course.isPopular) tags.push(POPULAR);
		if (course.level) tags.push(LEVELS[course.level]);
		if (course.type) tags.push(TYPES[course.type]);
		return tags;
	}
</script>

<script>
	import Card, { states } from '$lib/components/Card.svelte';
	import Icon from '@iconify/svelte';
	import Swipe from '$lib/components/Swipe.svelte';

	let card;

	/** @type {Course} */
	export let course;

	/** The expanded state of the card. */
	export let expanded = states.SHRUNK;

	/** The saved state of the card. */
	export let saved = false;

	/** The selected state of the card. */
	export let selected = false;

	/** The className to add to the component. */
	let className = '';
	export { className as class };
</script>

<Card bind:this={card} bind:expanded class={className} expandable>
	<header
		class="card relative translate-x-0 overflow-hidden shadow-none xl:flex"
		on:click={() => card.expand()}
	>
		<Swipe
			class="z-10 bg-white p-2 xl:grow"
			disabled={expanded}
			on:swipe={() => (selected = !selected)}
		>
			<div class="m-1 flex">
				<div class="flex grow flex-wrap gap-2">
					{#each tags(course) as tag}
						<p class="badge mr-0 font-medium {tag.style}">{tag.name}</p>
					{/each}
				</div>
				<div class="flex shrink-0 flex-wrap gap-2">
					<button
						class="p-1 xl:hidden"
						class:!block={expanded}
						on:click|stopPropagation={() => (saved = !saved)}
					>
						<Icon icon={saved ? 'mdi:bookmark' : 'mdi:bookmark-outline'} />
					</button>
					{#if expanded}
						<button class="p-1" on:click|stopPropagation={() => card.shrink()}>
							<Icon icon="mdi:close" />
						</button>
					{:else}
						<button
							class="p-1 xl:hidden"
							class:text-red-500={selected}
							on:click|stopPropagation={() => (selected = !selected)}
						>
							<Icon icon={selected ? 'mdi:minus-circle-outline' : 'mdi:plus'} />
						</button>
					{/if}
				</div>
			</div>
			<h1 class="m-1 my-2 text-2xl font-medium">{course.name}</h1>
			<div class="center m-1">
				{#if course.lecturer}
					<p class="sep-dot text-sm">{course.lecturer} 老師</p>
				{/if}
				{#if course.sessions}
					<p class="sep-dot text-sm">{course.sessions.prettyPrint()}</p>
				{/if}
			</div>
		</Swipe>
		<div class="absolute inset-0 -z-10 flex overflow-hidden xl:static">
			<div class="ml-auto mr-0 xl:hidden">
				<button
					class="center h-full w-20 flex-col justify-evenly py-4 text-white"
					class:bg-red-500={selected}
					class:bg-green-500={!selected}
				>
					<Icon icon={selected ? 'mdi:minus-circle-outline' : 'mdi:plus'} class="text-xl" />
					<span class="text-xs">{selected ? '移除課程' : '選擇課程'}</span>
				</button>
			</div>
			<div class="xl:center hidden h-full justify-evenly gap-2 px-4" class:!hidden={expanded}>
				<button
					class="center card p-2 px-3 shadow-none hover:bg-gray-200"
					on:click|stopPropagation={() => (saved = !saved)}
				>
					<Icon icon={saved ? 'mdi:bookmark' : 'mdi:bookmark-outline'} class="mr-2 text-xl" />
					{saved ? '已儲存' : '儲存課程'}
				</button>
				<button
					class="center card p-2 px-3 text-white shadow-none"
					class:bg-red-500={selected}
					class:bg-green-500={!selected}
					on:click|stopPropagation={() => (selected = !selected)}
				>
					<Icon icon={selected ? 'mdi:minus-circle-outline' : 'mdi:plus'} class="mr-2 text-xl" />
					{selected ? '移除課程' : '選擇課程'}
				</button>
			</div>
		</div>
	</header>
	{#if expanded !== states.SHRUNK}
		<main class="px-2">
			<ul class="mb-4 text-sm">
				<li class="m-1">
					<span class="font-medium">上課老師：</span>{course.lecturers.join('、')}
				</li>
				<li class="m-1"><span class="font-medium">上課班級：</span>{course.class}</li>
				<li class="m-1">
					<span class="font-medium">上課教室：</span>{course.room} ({course.room.describe()})
				</li>
			</ul>
			<p class="m-1 mb-4 tracking-wide">{course.abstract}</p>
			<div class="card m-1 mb-4 rounded-xl bg-gray-200 p-1 text-sm shadow-none">
				<h1 class="m-1 text-xs font-medium">課表備註</h1>
				<p class="m-1 text-sm">{course.remark}</p>
			</div>
			<div class="center m-1">
				<div class="center grow">
					{#if course.semester}
						<span class="sep-slash text-sm">{course.semester.shortName}</span>
					{/if}
					{#if course.weeks}
						<span class="sep-slash text-sm">{course.weeks}</span>
					{/if}
					{#if course.credits}
						<span class="sep-slash text-sm">{course.credits} 學分</span>
					{/if}
				</div>
				<button class="center p-1 text-sm">
					<Icon icon="mdi:paperclip" class="mr-1" />
					教學計畫
				</button>
			</div>
		</main>
		<footer class="p-2">
			<button
				class="card center center block w-full justify-center p-2 text-white shadow-none"
				class:bg-red-500={selected}
				class:bg-green-500={!selected}
				on:click={() => (selected = !selected)}
			>
				<Icon icon={selected ? 'mdi:minus-circle-outline' : 'mdi:plus'} class="mr-2" />
				{selected ? '移除課程' : '選擇課程'}
			</button>
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
