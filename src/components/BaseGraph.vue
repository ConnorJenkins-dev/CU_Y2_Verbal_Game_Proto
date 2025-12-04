<script setup lang="ts">
import { createChartComponent, ChartType } from '../services/GraphFactoryService';
import { defineComponent, ref } from 'vue';

// Define props
interface Props {
	chartType: ChartType;
	chartData: Record<string, unknown>;
	chartOptions: Record<string, unknown>;
}

const props = defineProps<Props>();

// Chart component reference
const chartComponent = ref<null | ReturnType<typeof defineComponent>>(null);

chartComponent.value = createChartComponent(props.chartType);
</script>

<template>
	<div v-if="chartComponent">
		<component :is="chartComponent" :chart-data="chartData" :chart-options="chartOptions" />
	</div>
	<div v-else>
		<p>Error: Invalid chart type</p>
	</div>
</template>
