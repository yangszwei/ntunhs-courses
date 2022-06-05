<script>
	import { createEventDispatcher } from 'svelte';

	/**
	 * This method returns the number within the limit closest to the value.
	 * @param {number} value
	 * @param {number} min
	 * @param {number} max
	 * @returns {number}
	 * */
	Math.limit = (value, min, max) => Math.max(min, Math.min(max, value));

	/** This gets the *absolute* position of an element. */
	function getAbsPosition(e) {
		const { scrollTop, scrollLeft } = e.parentElement;
		const { offsetHeight, offsetWidth } = e.offsetParent;
		return {
			top: e.offsetTop - scrollTop,
			left: e.offsetLeft - scrollLeft,
			bottom: offsetHeight - (e.offsetTop - scrollTop) - e.offsetHeight,
			right: offsetWidth - (e.offsetLeft - scrollLeft) - e.offsetWidth,
			parent: { scrollTop, scrollLeft, offsetHeight, offsetWidth },
		};
	}

	/** This method calculates the position for expanded element to expand to. */
	function calcExpandedPosition(e, viewport) {
		const { offsetHeight, offsetWidth } = viewport;
		const height = Math.limit(e.scrollHeight, offsetHeight * 0.6, offsetHeight * 0.8);
		const width = Math.limit(e.scrollWidth, offsetWidth * 0.8, Math.max(600, offsetWidth * 0.9));
		const middleX = viewport.offsetWidth / 2;
		const middleY = viewport.offsetHeight / 2;
		return {
			top: middleY - height / 2 - 2,
			left: middleX - width / 2,
			bottom: middleY - height / 2 - 2,
			right: middleX - width / 2,
		};
	}

	/** This is used to dispatch expand/shrink events. */
	const dispatch = createEventDispatcher();

	/** This method expands the Card element. */
	export function expand() {
		if (expanded || transiting || !expandable) return false;
		/** This is the initial position of the card. */
		const from = getAbsPosition(card);
		card.style.inset = `${from.top}px ${from.right}px ${from.bottom}px ${from.left}px`;
		/** This prevents effecting sibling elements when the card expands. */
		const placeholder = card.cloneNode(true);
		placeholder.classList.add('invisible');
		card.after(placeholder);
		/** The transition starts here. */
		dispatch('expand');
		transiting = 1;
		setTimeout(() => {
			const to = calcExpandedPosition(card, from.parent);
			card.style.inset = `${to.top}px ${to.right}px ${to.bottom}px ${to.left}px`;
			overlay?.classList.replace('opacity-0', 'opacity-100');
		});
		/** This cleans up the transition. */
		setTimeout(() => {
			expanded = true;
			transiting = 0;
		}, 210);
	}

	/** This method shrinks the expanded Card element. */
	export function shrink() {
		if (!expanded || transiting || !expandable) return false;
		const placeholder = card.nextElementSibling;
		const to = getAbsPosition(placeholder);
		card.style.inset = `${to.top}px ${to.right}px ${to.bottom}px ${to.left}px`;
		overlay?.classList.replace('opacity-100', 'opacity-0');
		dispatch('shrink');
		expanded = false;
		transiting = -1;
		/** This cleans up the transition. */
		setTimeout(() => {
			card.style.inset = '';
			card.parentElement.removeChild(placeholder);
			transiting = 0;
		}, 200);
	}

	/** @type {HTMLElement} */
	let card, overlay;

	/** The controls whether the card is expandable. */
	export let expandable = false;

	/** This is an indicator of the current transition state. */
	export let transiting = 0;

	/** The controls whether the card is expanded. */
	export let expanded = false;

	/** The class names to add to the Card. */
	let className = '';
	export { className as class };
</script>

<div bind:this={card} class:expandable class:transiting class:expanded class="card {className}">
	<slot />
</div>

{#if transiting || expanded}
	<div
		bind:this={overlay}
		class="overlay fixed inset-0 z-10 overflow-hidden bg-gray-500/75 opacity-0 xl:absolute"
		on:click={shrink}
	/>
{/if}

<style>
	.expandable,
	.overlay {
		transition: inset 0.2s;
	}

	.transiting {
		@apply absolute z-20 overflow-hidden shadow-none;
	}

	.expanded {
		@apply absolute z-20 overflow-auto shadow-none;
	}
</style>
