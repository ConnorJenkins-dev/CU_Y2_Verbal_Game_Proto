import { defineComponent } from 'vue';
import { Chart as VueChart } from 'vue-chartjs'; // Import the default Chart component
import {
	Chart as ChartJS,
	BarController,
	BarElement,
	PointElement,
	LineController,
	LineElement,
	PieController,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	ArcElement,
} from 'chart.js';

ChartJS.register(
	BarController,
	BarElement,
	PointElement,
	LineController,
	LineElement,
	PieController,
	CategoryScale,
	LinearScale,
	Title,
	Tooltip,
	Legend,
	ArcElement,
);

// Define chart type
export const ChartType = {
	Bar: 'bar',
	Line: 'line',
	Pie: 'pie',
};

type ChartComponent = ReturnType<typeof defineComponent>;

export function createChartComponent(chartType: string): ChartComponent {
	if (!Object.values(ChartType).includes(chartType)) {
		console.warn('Defaulting to bar as invalid chart type: ', chartType);
		chartType = ChartType.Bar;
	}

	return defineComponent({
		components: { VueChart },
		props: ['chartData', 'chartOptions'],
		data() {
			return {
				chartType,
			};
		},
		template: `<vue-chart :type="chartType" :data="chartData" :options="chartOptions" />`,
	});
}
