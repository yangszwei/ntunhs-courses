<script context="module">
	/**
	 * This method returns the number within the limit closest to the value.
	 * @param {number} value
	 * @param {number} min
	 * @param {number} max
	 * @returns {number}
	 * */
	Math.limit = (value, min, max) => Math.max(min, Math.min(max, value));
</script>

<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	/** @type {HTMLElement} */
	let swipe;

	/** This animates the swipe action. */
	function start(e) {
		if (disabled) return;

		/** @type {number} */
		let from, diff;

		function move(e) {
			diff = e.targetTouches[0].clientX - from + 25;
			swipe.style.transform = `translateX(${Math.limit(diff, -80, 0)}px)`;
		}

		function end() {
			swipe.style.transform = 'translateX(0px)';
			swipe.classList.replace('transition-none', 'transition-transform');
			setTimeout(() => {
				if (diff <= -64) dispatch('swipe', { diff });
				from = diff = 0;
				swipe.removeEventListener('touchmove', move);
				swipe.removeEventListener('touchend', end);
				swipe.classList.replace('transition-transform', 'transition-none');
			}, 150);
		}

		from = e.targetTouches[0].clientX;
		swipe.addEventListener('touchmove', move);
		swipe.addEventListener('touchend', end);
	}

	/** This disables the swipe. */
	export let disabled = false;

	/** The className to add to the component. */
	let className = '';
	export { className as class };
</script>

<div bind:this={swipe} class="translate-x-0 transition-none {className}" on:touchstart={start}>
	<slot />
</div>
