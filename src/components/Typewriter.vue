<script setup lang="ts">
import { ref, onMounted, useSlots, watch } from 'vue';

const { duration = 100 } = defineProps<{ duration?: number }>();
const typewriterText = ref('');
const slotContent = ref('');
const slots = useSlots();

let typewriterTimeout: number | null = null; // Track the timeout ID

const startTypeWriter = () => {
	// Clear any ongoing typewriter operation
	if (typewriterTimeout) {
		clearTimeout(typewriterTimeout);
		typewriterTimeout = null;
	}

	let index = 0;
	typewriterText.value = ''; // Reset the typewriter text

	const typeNextChar = () => {
		if (index < slotContent.value.length) {
			typewriterText.value += slotContent.value[index];
			index++;
			typewriterTimeout = setTimeout(typeNextChar, duration);
		}
	};

	typeNextChar();
};

const updateSlotContent = () => {
	const slot = slots.default?.();
	if (slot && slot[0] && typeof slot[0].children === 'string') {
		slotContent.value = slot[0].children.trim();
		startTypeWriter();
	}
};

// Watch for changes in the slot content
watch(
	() => slots.default?.()[0]?.children,
	(newContent) => {
		if (typeof newContent === 'string') {
			slotContent.value = newContent.trim();
			startTypeWriter();
		}
	},
);

onMounted(() => {
	updateSlotContent();
});
</script>

<template>
	<span
		class="overflow-hidden border-r-2 border-amber-600 mx-auto inline-block w-full text-center tracking-wide animate-typing break-words"
		>{{ typewriterText }}</span
	>
</template>

<style scoped></style>
