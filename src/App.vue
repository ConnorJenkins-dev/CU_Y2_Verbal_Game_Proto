<script setup lang="ts">
import { computed, ref } from 'vue';

const navStyle = ref({
	backgroundImage: 'url(src/assets/Pictures/background.jpg)',
	backgroundSize: 'cover',
	backgroundPosition: 'center', // Optional: Keeps the background centered
	width: '100%',
});

const logoImage = computed(() => {
	const imagePath = `/src/assets/Pictures/end.jpg`;
	return new URL(imagePath, import.meta.url).href;
});
</script>

<template>
	<div id="app" class="flex flex-col min-h-screen">
		<nav class="bg-amber-950 text-white px-6 py-4 shadow-md" :style="navStyle">
			<div class="w-20 h-20">
				<img :src="logoImage" alt="Cowboy logo" class="rounded-md" />
			</div>
			<ul class="flex space-x-6">
				<li><router-link to="/">Home</router-link></li>
				<li><router-link to="/dashboard">Dashboard</router-link></li>
			</ul>
		</nav>
		<router-view class="flex-1"></router-view>
	</div>
</template>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}
.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
