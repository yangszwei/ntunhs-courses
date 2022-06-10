<script context="module">
	import { Course } from '$lib/js/course.js';

	export async function load({ fetch }) {
		const res = await fetch('/courses');

		if (res.ok) {
			const data = await res.json();

			return {
				props: {
					courses: data.map((value) => new Course(value)),
				},
			};
		}

		return { error: new Error((await res.json()).message) };
	}
</script>

<script>
	import '../app.css';
	import Icon from '@iconify/svelte';
	import AppBar from '$lib/components/AppBar.svelte';
	import CourseCard from '$lib/components/CourseCard.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import Summary from '$lib/components/Summary.svelte';
	import { APP_NAME } from '$lib/values/app.js';
	import { onMount } from 'svelte';

	/** This controls the active tab in mobile view. */
	let tab = '';

	/** @type {HTMLElement} */
	let filter, main, aside;

	const animate = (function () {
		let from, start, diff, max;
		return {
			init: () => (from = max = parseInt(getComputedStyle(aside).top, 10)),
			search: () => {
				filter.classList.remove('hidden');
				if (tab !== 'search') {
					main.style.opacity = `${0}`;
					filter.style.bottom = `${window.innerHeight - max}px`;
				}
				main.classList.replace('transition-none', 'transition-[opacity_0.2s]');
				aside.classList.replace('transition-none', 'transition-[all_0.2s]');
				setTimeout(() => {
					if (tab === 'search') {
						tab = '';
						aside.style.top = `${max}px`;
						main.style.opacity = `${1}`;
						main.classList.remove('hidden');
						filter.classList.replace('opacity-100', 'opacity-0');
						filter.classList.replace('bottom-0', 'bottom-full');
					} else {
						tab = 'search';
						main.classList.add('hidden');
						main.style.opacity = `${0}`;
						filter.style.bottom = `0px`;
						aside.style.top = `${window.innerHeight}px`;
						filter.classList.replace('opacity-0', 'opacity-100');
						filter.classList.replace('bottom-full', 'bottom-0');
					}
				});
				setTimeout(() => {
					main.classList.replace('transition-[opacity_0.2s]', 'transition-none');
					aside.classList.replace('transition-[all_0.2s]', 'transition-none');
				}, 1000);
			},
			start: (e) => (start = e.targetTouches[0].clientY),
			move: (e) => {
				diff = e.targetTouches[0].clientY - start;
				main.style.opacity = `${Math.min(Math.max(from + diff * 1.2, 0) / max)}`;
				aside.style.top = Math.min(Math.max(from + diff, 0), max) + 'px';
			},
			end: () => {
				aside.classList.replace('transition-none', 'transition-[all_0.2s]');
				setTimeout(() => {
					const change = Math.abs(diff) > max * 0.15;
					if ((change && diff >= 0) || (!change && diff < 0)) {
						from = max;
						tab = '';
						main.classList.replace('z-30', 'z-20');
						main.style.opacity = `${1}`;
						aside.style.top = `${max}px`;
					} else {
						from = 0;
						tab = 'summary';
						main.classList.replace('z-20', 'z-30');
						main.style.opacity = `${0}`;
						aside.style.top = `0px`;
					}
				});
				setTimeout(() => {
					start = diff = 0;
					aside.classList.replace('transition-[all_0.2s]', 'transition-none');
				}, 200);
			},
		};
	})();

	onMount(animate.init);

	let cards = [];

	let selected;

	let checkboxes = [];

	$: selected = courses.filter((v, i) => checkboxes[i]);

	export let courses = [];
</script>

<svelte:window on:resize={animate.init} />

<svelte:head>
	<!-- Google Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<AppBar title={APP_NAME}>
	<button
		class="p-2"
		class:text-gray-400={tab === 'summary'}
		disabled={tab === 'summary'}
		on:click={animate.search}
	>
		<Icon icon={tab === 'search' ? 'mdi:close' : 'mdi:search'} class="text-xl" />
	</button>
</AppBar>

<div class="relative m-2 mt-0 h-full overflow-hidden xl:flex">
	<nav
		bind:this={filter}
		class:hidden={tab !== 'search'}
		class="not absolute bottom-full z-20 h-full w-full p-2 pb-4 opacity-0 transition-[all_1s] xl:static xl:!block xl:w-2/12 xl:opacity-100"
	>
		<Filter />
	</nav>
	<main
		bind:this={main}
		class:z-30={cards.some((exp) => exp)}
		class="relative h-full grow pb-10 transition-none xl:pb-4"
	>
		<div class="flex h-full flex-col gap-4 overflow-y-auto p-2 pb-4 xl:pb-0">
			{#each courses as course, i (course.id)}
				<input
					bind:checked={checkboxes[i]}
					bind:group={selected}
					type="checkbox"
					class="hidden"
					value={course}
				/>
				<CourseCard bind:expanded={cards[i]} bind:selected={checkboxes[i]} {course} />
			{/each}
		</div>
	</main>
	<aside
		bind:this={aside}
		class="absolute top-[calc(100%-3rem)] z-20 h-full w-full p-2 pb-4 pt-0 transition-none xl:static xl:w-4/12"
	>
		<div class="h-full">
			<Summary
				courses={selected}
				on:touchstart={animate.start}
				on:touchmove={animate.move}
				on:touchend={animate.end}
			/>
		</div>
	</aside>
</div>

<slot />
