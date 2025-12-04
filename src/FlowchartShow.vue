<template>
	<div>
		<h1>Flowchart Page</h1>
		<Suspense>
			<Flowchart />
		</Suspense>
	</div>
</template>

<script setup lang="ts">
import Flowchart from './components/Flowchart.vue';
import '@vue-flow/core/dist/style.css';
</script>
