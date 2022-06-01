<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	/** @type {HTMLElement} */
	let card, overlay;

	/** The expanded state of the card. */
	export let expanded = 0;

	/**
	 * This gets the offset position of the element.
	 * @param {HTMLElement} e - The target element.
	 * */
	function getPosition(e) {
		return {
			target: e,
			scrollTop: e.parentElement.scrollTop,
			scrollLeft: e.parentElement.scrollLeft,
			top: e.offsetTop - e.parentElement.scrollTop,
			left: e.offsetLeft - e.parentElement.scrollLeft,
			bottom:
				e.offsetParent.offsetHeight - e.offsetTop - e.offsetHeight + e.parentElement.scrollTop,
			right: e.offsetParent.offsetWidth - e.offsetLeft - e.offsetWidth + e.parentElement.scrollLeft,
			height: e.offsetHeight,
			width: e.offsetWidth,
		};
	}

	/** Transition duration. */
	const DURATION = 200;

	/** This expands the Card element. */
	export function expand() {
		if (expanded === 2) return;
		const pos = getPosition(card);
		card.style.inset = `${pos.top}px ${pos.right}px ${pos.bottom}px ${pos.left}px`;
		const placeholder = card.cloneNode(true);
		placeholder.classList.add('invisible');
		expanded = 1;
		dispatch('expand');
		setTimeout(() => {
			card.after(placeholder);
			pos.target.parentElement.scrollTo(pos.scrollLeft, pos.scrollTop);
			card.style.inset = typeof expandTo === 'function' ? expandTo(pos) : expandTo;
			overlay.classList.replace('opacity-0', 'opacity-100');
		});
		setTimeout(() => {
			expanded = 2;
		}, DURATION);
	}

	/** This shrinks the Card element. */
	export function shrink() {
		if (expanded === 0) return;
		expanded = 1;
		dispatch('shrink');
		const placeholder = card.nextElementSibling;
		const pos = getPosition(placeholder);
		card.style.inset = `${pos.top}px ${pos.right}px ${pos.bottom}px ${pos.left}px`;
		overlay.classList.replace('opacity-100', 'opacity-0');
		setTimeout(() => {
			card.parentElement.removeChild(placeholder);
			expanded = 0;
		}, DURATION);
	}

	/** This returns the position that the card should be expanded to. */
	export let expandTo = function (pos) {
		const insetX = (pos.target.offsetParent.offsetWidth - 768) / 2;
		const insetY = Math.min(window.innerHeight * 0.9, 500) / 2;
		const middleY = window.innerHeight / 2;
		return `
			${
				Math.min(middleY - Math.min(250, middleY - window.innerHeight * 0.1), insetY) -
				pos.target.parentElement.getBoundingClientRect().top
			}px
			${Math.max(pos.right, insetX)}px
			${Math.min(middleY - Math.min(250, middleY - window.innerHeight * 0.1), insetY)}px
			${Math.max(pos.left, insetX)}px
		`;
	};
</script>

{#if expanded !== 0}
	<div
		bind:this={overlay}
		class="fixed inset-0 z-10 overflow-hidden bg-gray-500 bg-opacity-75 opacity-0 transition-all duration-200 xl:absolute"
		on:click={shrink}
	/>
{/if}

<div
	bind:this={card}
	class:absolute={expanded !== 0}
	class:overflow-auto={expanded !== 0}
	class:shadow-xl={expanded === 0}
	class:z-20={expanded !== 0}
	class="rounded-xl bg-white shadow-xl shadow-gray-200 transition-all duration-200"
>
	<slot />
</div>
