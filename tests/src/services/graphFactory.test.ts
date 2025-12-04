// Tests for chartFactory

import { createChartComponent, ChartType } from '../../../src/services/GraphFactoryService';
import { expect, test } from 'vitest';
import { mount } from '@vue/test-utils';

// Test to check if GraphFactory returns Bar
test('GraphFactoryReturnsBar', () => {
	const BarChartComponent = createChartComponent(ChartType.Bar);
	const wrapper = mount(BarChartComponent, {
		props: {
			chartData: {
				// Mock data
				labels: ['A', 'B', 'C'],
				datasets: [],
			},
			chartOptions: {},
		},
	});
	expect(wrapper.vm.chartType).toBe('bar');
});

// Test to check if GraphFactory returns line
test('GraphFactoryReturnsLine', () => {
	const BarChartComponent = createChartComponent(ChartType.Line);
	const wrapper = mount(BarChartComponent, {
		props: {
			chartData: {
				// Mock data
				labels: ['A', 'B', 'C'],
				datasets: [],
			},
			chartOptions: {},
		},
	});
	expect(wrapper.vm.chartType).toBe('line');
});

// Test to check if GraphFactory returns pie

test('GraphFactoryReturnsPie', () => {
	const BarChartComponent = createChartComponent(ChartType.Pie);
	const wrapper = mount(BarChartComponent, {
		props: {
			chartData: {
				// Mock data
				labels: ['A', 'B', 'C'],
				datasets: [],
			},
			chartOptions: {},
		},
	});
	expect(wrapper.vm.chartType).toBe('pie');
});

// Test to check if GraphFactory returns default when input not expected
test('GraphFactoryReturnsDefault', () => {
	const BarChartComponent = createChartComponent(ChartType.noChart);
	const wrapper = mount(BarChartComponent, {
		props: {
			chartData: {
				// Mock data
				labels: ['A', 'B', 'C'],
				datasets: [],
			},
			chartOptions: {},
		},
	});
	expect(wrapper.vm.chartType).toBe('bar');
});
