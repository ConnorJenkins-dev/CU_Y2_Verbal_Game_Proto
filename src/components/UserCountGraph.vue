// Reference: https://www.highcharts.com/demo/highcharts/line-chart
//https://tofl.github.io/how-to-use-highcharts-vue-js/

<script setup>
import { onMounted, ref } from 'vue';
import { getUserCount } from '../services/userCountService';

const chartOptions = ref({
	chart: {
		type: 'line',
	},
	title: {
		text: 'No. of enrollments per timescale: ',
	},
	xAxis: {
		categories: [],
	},
	yAxis: {
		title: {
			text: 'No. Of Users:',
		},
	},
	series: [
		{
			name: 'Users',
			data: [],
		},
	],
});

onMounted(() => {
	fetchChartData('year');
});

// Call service to fetch data from api
const fetchChartData = async (scale) => {
	const data = await getUserCount(scale);

	if (data) {
		// Update chart data when received
		chartOptions.value.xAxis.categories = data.xAxis;
		chartOptions.value.series[0].data = data.yAxis;
	}
};
</script>

<template>
	<section class="flex flex-col items-center">
		<div id="buttons" class="flex flex-row space-x-4 m-4">
			<button
				class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				@click="fetchChartData('year')"
			>
				Year
			</button>
			<button
				class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				@click="fetchChartData('month')"
			>
				Month
			</button>
			<button
				class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				@click="fetchChartData('week')"
			>
				Week
			</button>
		</div>
		<div class="size=32">
			<highcharts :options="chartOptions"></highcharts>
		</div>
	</section>
</template>
