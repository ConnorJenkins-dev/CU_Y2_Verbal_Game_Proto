<template>
	<div class="flowchart-container">
		<div class="controls">
			<button @click="highlightPath(pathA)">Highlight Path A</button>
			<button @click="highlightPath(pathB)">Highlight Path B</button>
			<button @click="clearHighlights">Clear Highlights</button>
			<button @click="toggleUnvisitedPaths">Toggle Unvisited Paths</button>
		</div>
		<VueFlow
			:nodes="visibleNodes"
			:edges="visibleEdges"
			:fit-view="true"
			:default-edge-options="{ type: 'step', style: { stroke: 'white', strokeWidth: 2 } }"
			:nodes-draggable="false"
			class="vue-flow-container"
			@node-click="onNodeClick"
		/>
	</div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { VueFlow } from '@vue-flow/core';
import '@vue-flow/core/dist/style.css';
import { getPercent } from '../services/narrativeService.ts';

const emits = defineEmits(['setId']);

const onNodeClick = ({ event, node }) => {
	// This log is mainly so linter doesn't complain about unused variables
	console.log('Event: ', event, 'on node: ', node);
	if (isNaN(parseInt(node.id))) {
		return;
	}
	visitNode(node.id);
	emits('setId', parseInt(node.id));
};

const visitNode = (nodeId: string) => {
	if (isNaN(parseInt(nodeId))) {
		return;
	}
	if (nodeId === '1') {
		clearVisited();
	}
	const visitedNode = nodes.value.find((n) => n.id === nodeId);
	if (!visitedNode) {
		return;
	}
	if (visitedNode) {
		visitedNode.data.visited = true;
	}
	clearHighlights();
	// Make visible all default nodes below y value of visited node

	const visitedNodeY = visitedNode.position.y;
	nodes.value.forEach((node) => {
		if (node.position.y < visitedNodeY && node.type === 'default') {
			node.data.visited = true;
		}
	});
	highlightPath([nodeId]);
};

defineExpose({ visitNode });

interface Node {
	id: string;
	type: string;
	label: string;
	position: { x: number; y: number };
	data: { visited: boolean; highlighted: boolean };
}

interface Edge {
	id: string;
	source: string;
	target: string;
	label: string;
	data?: { visited: boolean; highlighted: boolean };
}

const nodes = ref<Node[]>([
	{
		id: 'start',
		type: 'input',
		label: 'Start ',
		position: { x: 400, y: 0 },
		data: { visited: true, highlighted: false },
	},
	{
		id: '1',
		type: 'stage',
		label: 'Run or Save?',
		position: { x: 400, y: 100 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '2',
		type: 'stage',
		label: 'Run',
		position: { x: 200, y: 200 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '3',
		type: 'stage',
		label: 'Save',
		position: { x: 600, y: 200 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '4',
		type: 'stage',
		label: 'Make deputy wait or follow him?',
		position: { x: 400, y: 300 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '6',
		type: 'stage',
		label: 'Do you take the bounty?',
		position: { x: 600, y: 400 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '5',
		type: 'stage',
		label: 'Do you take the bounty?',
		position: { x: 200, y: 400 },
		data: { visited: false, highlighted: false },
	},
	{
		id: 'bounty',
		type: 'default',
		label: '?',
		position: { x: 400, y: 500 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '7',
		type: 'stage',
		label: 'You die',
		position: { x: 200, y: 600 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '8',
		type: 'stage',
		label: 'Tracks or Road?',
		position: { x: 400, y: 600 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '9',
		type: 'stage',
		label: 'Rush or Sneak?',
		position: { x: 200, y: 700 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '11',
		type: 'stage',
		label: 'Kill or Spare?',
		position: { x: 400, y: 800 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '12',
		type: 'stage',
		label: 'You die',
		position: { x: 0, y: 800 },
		data: { visited: false, highlighted: false },
	},
	{
		id: 'kill',
		type: 'default',
		label: 'Kill',
		position: { x: 200, y: 900 },
		data: { visited: false, highlighted: false },
	},
	{
		id: 'spare',
		type: 'default',
		label: 'Spare',
		position: { x: 600, y: 900 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '19',
		type: 'stage',
		label: 'Jenkins or Wagon?',
		position: { x: 700, y: 1000 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '21',
		type: 'stage',
		label: 'You Die',
		position: { x: 400, y: 1100 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '22',
		type: 'stage',
		label: 'End of Demo',
		position: { x: 1000, y: 1100 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '10',
		type: 'stage',
		label: 'Tunnel or Path?',
		position: { x: 600, y: 700 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '16',
		type: 'stage',
		label: 'Gun or Sword?',
		position: { x: 800, y: 800 },
		data: { visited: false, highlighted: false },
	},
	{
		id: '18',
		type: 'stage',
		label: 'You Die',
		position: { x: 1000, y: 870 },
		data: { visited: false, highlighted: false },
	},
]);

const edges = ref<Edge[]>([
	{ id: 'startTo1', source: 'start', target: '1', label: '' },
	{ id: '1To2', source: '1', target: '2', label: 'Run' },
	{ id: '1To3', source: '1', target: '3', label: 'Save' },
	{ id: '2To4', source: '2', target: '4', label: '' },
	{ id: '3To4', source: '3', target: '4', label: '' },
	{ id: '4to6', source: '4', target: '6', label: 'Wait' },
	{ id: '4to5', source: '4', target: '5', label: 'Follow' },
	{ id: '6toBounty', source: '6', target: 'bounty', label: '' },
	{ id: '5toBounty', source: '5', target: 'bounty', label: '' },
	{ id: 'bountyTo7', source: 'bounty', target: '7', label: 'No' },
	{ id: 'bountyTo8', source: 'bounty', target: '8', label: 'Yes' },
	{ id: '8to9', source: '8', target: '9', label: 'Tracks' },
	{ id: '8to10', source: '8', target: '10', label: 'Road' },
	{ id: '9to11', source: '9', target: '11', label: 'Sneak' },
	{ id: '9to12', source: '9', target: '12', label: 'Rush' },
	{ id: '11toKill', source: '11', target: 'kill', label: 'Kill' },
	{ id: '11toSpare', source: '11', target: 'spare', label: 'Spare' },
	{ id: 'killTo19', source: 'kill', target: '19', label: '' },
	{ id: 'spareTo19', source: 'spare', target: '19', label: '' },
	{ id: '19to21', source: '19', target: '21', label: 'Jenkins' },
	{ id: '19to22', source: '19', target: '22', label: 'Wagon' },
	{ id: '10to19', source: '10', target: '19', label: 'Tunnel' },
	{ id: '10to16', source: '10', target: '16', label: 'Path' },
	{ id: '16to18', source: '16', target: '18', label: 'Sword' },
	{ id: '16to19', source: '16', target: '19', label: 'Gun' },
]);

const pathA = ['start', '1', '2', '4', '6', 'bounty', '8', '9', '11', 'kill', '19', '22'];

const pathB = ['start', '2', '4', '5', 'bounty', '8', '10', '15', '22'];

const showUnvisited = ref(true);
const highlightedPath = ref<string[]>([]);

const visibleNodes = computed(() =>
	nodes.value
		.filter(
			(node) =>
				showUnvisited.value || highlightedPath.value.includes(node.id) || node.data.visited,
		)
		.map((node) => ({
			...node,
			style: highlightedPath.value.includes(node.id)
				? { backgroundColor: 'yellow', color: 'black' }
				: { backgroundColor: '#333', color: 'white' },
		})),
);

const visibleEdges = computed(() =>
	edges.value.map((edge) => ({
		...edge,
		class:
			highlightedPath.value.includes(edge.source) &&
			highlightedPath.value.includes(edge.target)
				? 'highlighted'
				: '',
		style:
			highlightedPath.value.includes(edge.source) &&
			highlightedPath.value.includes(edge.target)
				? { stroke: 'yellow' }
				: { stroke: 'white' },
	})),
);

const toggleUnvisitedPaths = () => {
	showUnvisited.value = !showUnvisited.value;
};

const highlightPath = (path: string[]) => {
	highlightedPath.value = path;
};

const clearHighlights = () => {
	highlightedPath.value = [];
};

const clearVisited = () => {
	nodes.value.forEach((node) => {
		node.data.visited = false;
	});
};

for (let i = 0; i < nodes.value.length; i++) {
	// Check if node has numeric id (i.e., is it an actual stage in the story?)
	if (isNaN(parseInt(nodes.value[i].id))) {
		continue;
	}
	const node = nodes.value[i];
	const percent = await getPercent(node.id);
	const percentTruncated = percent.toFixed(0);
	node.label = node.label + ' ' + percentTruncated + '%';
}

onMounted(() => {
	visitNode('start');
	visitNode('1');
});
</script>
<style>
.flowchart-container {
	height: 100vh;
	display: flex;
	flex-direction: column;
}

.controls {
	padding: 10px;
	display: flex;
	gap: 10px;
}

.vue-flow-container {
	flex-grow: 1;
	background-color: #1e1e1e; /* Dark gray background */
}

.vue-flow__node {
	background-color: #333;
	color: white;
	border: 1px solid black;
	padding: 10px;
	border-radius: 5px;
	margin: 0 20px;
}

.vue-flow__node.highlighted {
	background-color: yellow;
	color: black;
}

.vue-flow__edge {
	stroke: white; /* White edges */
	stroke-width: 1px;
	background-color: #1e1e1e;
}

.vue-flow__edge.highlighted {
	stroke: yellow;
	stroke-width: 1px;
}

.vue-flow__edge-textbg {
	fill: #1e1e1e;
}

#you_die {
	position: relative;
	top: 50px;
}
</style>
