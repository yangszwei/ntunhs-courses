<script context="module">
	import Course from '$lib/models/course.js';

	export async function load({ fetch }) {
		const res = await fetch('/courses');
		if (res.ok) {
			const data = await res.json();
			const courses = data.map((props) => new Course(props));
			return { props: { courses } };
		}
	}
</script>

<script>
	import '../app.css';
	import Icon from '@iconify/svelte';
	import AppBar from '$lib/components/layout/AppBar.svelte';
	import CourseCard from '$lib/components/CourseCard.svelte';
	import Summary from '$lib/components/layout/Summary.svelte';
	import Search from '$lib/components/layout/Search.svelte';
	import { onMount } from 'svelte';

	/** This controls the active tab in mobile view. */
	let tab = '';

	/** @type {HTMLElement} */
	let search, main, aside;

	const animate = (function () {
		let from, start, diff, max;
		return {
			init: () => (from = max = parseInt(getComputedStyle(aside).top, 10)),
			search: () => {
				search.classList.remove('hidden');
				if (tab !== 'search') {
					main.style.opacity = `${0}`;
					search.style.bottom = `${window.innerHeight - max}px`;
				}
				main.classList.replace('transition-none', 'transition-[opacity_0.2s]');
				aside.classList.replace('transition-none', 'transition-[all_0.2s]');
				setTimeout(() => {
					if (tab === 'search') {
						tab = '';
						aside.style.top = `${max}px`;
						main.style.opacity = `${1}`;
						main.classList.remove('hidden');
						search.classList.replace('opacity-100', 'opacity-0');
						search.classList.replace('bottom-0', 'bottom-full');
					} else {
						tab = 'search';
						main.classList.add('hidden');
						main.style.opacity = `${0}`;
						search.style.bottom = `0px`;
						aside.style.top = `${window.innerHeight}px`;
						search.classList.replace('opacity-0', 'opacity-100');
						search.classList.replace('bottom-full', 'bottom-0');
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

	let checkboxes = [];

	export let courses = [];

	$: selected = courses.filter((v, i) => checkboxes[i]);
	$: console.log(selected);
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

<AppBar>
	<button
		class="p-2 xl:hidden"
		class:text-gray-400={tab === 'summary'}
		disabled={tab === 'summary'}
		on:click={() => animate.search()}
	>
		<Icon icon={tab === 'search' ? 'mdi:close' : 'mdi:search'} class="text-xl" />
	</button>
</AppBar>

<div class="relative h-full overflow-hidden xl:flex">
	<div
		bind:this={search}
		class="absolute bottom-full z-20 h-full w-full opacity-0 transition-[all_1s] xl:static xl:static xl:!block xl:w-1/5 xl:opacity-100"
	>
		<Search />
	</div>
	<main bind:this={main} class="h-full xl:grow xl:pb-4">
		<div class="relative h-full overflow-hidden rounded-xl">
			<div class="flex h-full flex-col gap-2 overflow-auto p-4 pb-14 pt-0">
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
		</div>
	</main>
	<aside
		bind:this={aside}
		class="absolute top-[calc(100%-3rem)] z-20 h-full w-full transition-none xl:static xl:w-1/3"
	>
		<Summary
			courses={selected}
			on:touchstart={animate.start}
			on:touchmove={animate.move}
			on:touchend={animate.end}
		/>
	</aside>
</div>

<slot />
