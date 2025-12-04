<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
	size: 'small' | 'medium' | 'large';
}>();

const buttonClasses = computed(() => {
	const sizeClasses = {
		small: 'px-3 py-1 text-sm',
		medium: 'px-4 py-2 text-base',
		large: 'px-6 py-3 text-lg',
	};
	const baseClasses = 'rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
	const amberClasses = 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500';
	return `${baseClasses} ${amberClasses} ${sizeClasses[props.size]}`;
});
</script>

<template>
	<div>
		<button :class="buttonClasses">
			<slot />
		</button>
	</div>
</template>
