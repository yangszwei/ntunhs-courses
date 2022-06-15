<script context="module">
	/** The expanded states of the card. */
	export const states = Object.freeze({
		SHRUNK: 0,
		SHRINKING: -1,
		EXPANDING: 1,
		EXPANDED: 2,
	});

	/**
	 * This method returns the number within the limit closest to the value.
	 * @param {number} value
	 * @param {number} min
	 * @param {number} max
	 * @returns {number}
	 * */
	Math.limit = (value, min, max) => Math.max(min, Math.min(max, value));

	/** This gets the *absolute* position of an element. */
	function getPosition(e) {
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

	/** This method calculates the position to expand to. */
	function calcExpandedPosition(e, viewport) {
		const { offsetHeight, offsetWidth } = viewport;
		const height = Math.limit(e.scrollHeight, offsetHeight * 0.5, offsetHeight * 0.8);
		const width = Math.limit(
			e.scrollWidth,
			offsetWidth * 0.6,
			innerWidth > 1280 ? Math.min(750, offsetWidth * 0.9) : offsetWidth * 0.9
		);
		const middleX = viewport.offsetWidth / 2;
		const middleY = viewport.offsetHeight / 2;
		return {
			top: middleY - height / 2 - (innerWidth > 1280 ? 12 : 2),
			left: middleX - width / 2,
			bottom: middleY - height / 2 - (innerWidth > 1280 ? 12 : 2),
			right: middleX - width / 2,
		};
	}
</script>

<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	/** This expands the card. */
	export function expand() {
		if (expanded !== states.SHRUNK || !expandable) return false;
		/** This is the initial position of the card. */
		const from = getPosition(card);
		card.style.inset = `${from.top}px ${from.right}px ${from.bottom}px ${from.left}px`;
		/** This prevents effecting sibling elements when the card expands. */
		const placeholder = card.cloneNode(true);
		placeholder.classList.add('invisible');
		card.after(placeholder);
		/** The transition starts here. */
		dispatch('expand');
		expanded = states.EXPANDING;
		setTimeout(() => {
			const to = calcExpandedPosition(card, from.parent);
			card.style.inset = `${to.top}px ${to.right}px ${to.bottom}px ${to.left}px`;
			overlay?.classList.replace('opacity-0', 'opacity-100');
		});
		/** This cleans up the transition. */
		setTimeout(() => (expanded = states.EXPANDED), 210);
	}

	/** This shrinks the card. */
	export function shrink() {
		if (expanded !== states.EXPANDED) return false;
		const placeholder = card.nextElementSibling;
		const to = getPosition(placeholder);
		card.style.inset = `${to.top}px ${to.right}px ${to.bottom}px ${to.left}px`;
		overlay?.classList.replace('opacity-100', 'opacity-0');
		dispatch('shrink');
		expanded = states.SHRINKING;
		/** This cleans up the transition. */
		setTimeout(() => {
			card.style.inset = '';
			card.parentElement.removeChild(placeholder);
			expanded = states.SHRUNK;
		}, 200);
	}

	/** @type {HTMLElement} */
	let card, overlay;

	/** This controls the expandability of the card. */
	export let expandable = false;

	/** The expanded state of the card. */
	export let expanded = states.SHRUNK;

	/** The className to add to the component. */
	let className = '';
	export { className as class };
</script>

{#if expanded !== states.SHRUNK}
	<div
		bind:this={overlay}
		class="fixed inset-0 z-10 overflow-hidden bg-gray-500/75 opacity-0 transition-[opacity_0.2s] xl:absolute"
		on:click={shrink}
	/>
{/if}

<div
	bind:this={card}
	class="card transition-[inset_0.2s] {className}"
	class:expandable
	class:expanded
	class:overflow-hidden={expanded === states.SHRINKING || expanded === states.EXPANDING}
	class:overflow-auto={expanded === states.EXPANDED}
>
	<slot />
</div>

<style>
	.expanded {
		@apply absolute z-20 shadow-none;
	}
</style>
