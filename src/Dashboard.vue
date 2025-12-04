<script setup>
import { ref } from 'vue';
import UserCountGraph from './components/UserCountGraph.vue';
//takes name of card as inout.
const visibleCard = ref('graphCard1');

// sets visibleCard prop
const toggleVisibility = (id) => {
	visibleCard.value = id;
};
</script>

<template>
	<main class="mx-20 my-5 flex">
		<div
			id="sidebar"
			class="h-screen w-64 fixed top-25 left-0 bg-gray-900 text-white flex flex-col rounded-lg"
		>
			<button
				class="sidebar-icon items-center my-3 mx-3 flex justify-center h-12 bg-gray-800 rounded-lg shadow-md hover:bg-gray-600"
				@click="toggleVisibility('graphCard1')"
			>
				ShowGraphCard1
			</button>
			<button
				class="sidebar-icon items-center my-3 mx-3 flex justify-center h-12 bg-gray-800 rounded-lg shadow-md hover:bg-gray-600"
				@click="toggleVisibility('graphCard2')"
			>
				ShowGraphCard2
			</button>
			<button
				class="sidebar-icon items-center my-3 mx-3 flex justify-center h-12 bg-gray-800 rounded-lg shadow-md hover:bg-gray-600"
				@click="toggleVisibility('graphCard3')"
			>
				ShowGraphCard3
			</button>
			<button
				class="sidebar-icon items-center my-3 mx-3 flex justify-center h-12 bg-gray-800 rounded-lg shadow-md hover:bg-gray-600"
			>
				Placeholder
			</button>
			<button
				class="sidebar-icon items-center my-3 mx-3 flex justify-center h-12 bg-gray-800 rounded-lg shadow-md hover:bg-gray-600"
			>
				Placeholder
			</button>
			<!--      <Button></Button>-->
		</div>

		<div id="main-content" class="ml-64 flex-1 bg-gray-400 p-4 rounded-lg shadow-md h-screen">
			<div v-if="visibleCard === 'graphCard1'" id="graphCard1" class="flex">
				<div class="bg-gray-200 flex rounded m-5 h-min">
					<UserCountGraph />
				</div>
				<div class="bg-gray-200 flex rounded m-5 h-min">
					<h1 class="text-2xl text-black font-bold m-5">Graph for button 1, 2</h1>
				</div>
				<div class="bg-gray-200 flex rounded m-5 h-min">
					<h1 class="text-2xl text-black font-bold m-5">Graph for button 1, 3</h1>
				</div>
			</div>
			<div v-if="visibleCard === 'graphCard2'" id="graphCard2" class="flex">
				<div id="graphCard" class="bg-gray-200 flex rounded m-5 h-min">
					<h1 class="text-2xl text-black font-bold m-5">Graph for button 2, 1</h1>
				</div>
				<div id="graphCard" class="bg-gray-200 flex rounded m-5 h-min">
					<h1 class="text-2xl text-black font-bold m-5">Graph for button 2, 2</h1>
				</div>
				<div id="graphCard" class="bg-gray-200 flex rounded m-5 h-min">
					<h1 class="text-2xl text-black font-bold m-5">Graph for button 2, 3</h1>
				</div>
			</div>
			<div v-if="visibleCard === 'graphCard3'" id="graphCard3" class="flex">
				<div id="graphCard" class="bg-gray-200 flex rounded m-5 h-min">
					<h1 class="text-2xl text-black font-bold m-5">Graph for button 3, 1</h1>
				</div>
				<div id="graphCard" class="bg-gray-200 flex rounded m-5 h-min">
					<h1 class="text-2xl text-black font-bold m-5">Graph for button 3, 2</h1>
				</div>
				<div id="graphCard" class="bg-gray-200 flex rounded m-5 h-min">
					<h1 class="text-2xl text-black font-bold m-5">Graph for button 3, 3</h1>
				</div>
			</div>
		</div>
	</main>
</template>

<style scoped></style>
