<template>
	<section id="account_submission" class="max-w-xl mx-auto p-8 bg-white shadow-md rounded-lg">
		<form class="space-y-6" @submit.prevent>
			<h2 class="text-2xl font-semibold text-center text-gray-800">Session Statistics</h2>

			<div class="form-group">
				<label for="username" class="block font-medium text-gray-700">Username:</label>
				<input
					id="username"
					v-model="username"
					type="text"
					name="username"
					required
					class="w-full mt-1 p-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
				/>
			</div>

			<div class="form-group">
				<label for="email" class="block font-medium text-gray-700">Email:</label>
				<input
					id="email"
					v-model="email"
					type="email"
					name="email"
					required
					class="w-full mt-1 p-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
				/>
			</div>

			<div class="form-group">
				<label for="seconds" class="block font-medium text-gray-700">Seconds Played:</label>
				<input
					id="seconds"
					v-model.number="seconds"
					type="number"
					name="seconds"
					required
					class="w-full mt-1 p-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
				/>
			</div>

			<div class="form-group">
				<label for="increaseSpeed" class="block font-medium text-gray-700"
					>Increase Speed:</label
				>
				<input
					id="increaseSpeed"
					v-model.number="increaseSpeed"
					type="number"
					name="increaseSpeed"
					required
					class="w-full mt-1 p-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
				/>
			</div>

			<div class="form-group">
				<label for="decreaseSpeed" class="block font-medium text-gray-700"
					>Decrease Speed:</label
				>
				<input
					id="decreaseSpeed"
					v-model.number="decreaseSpeed"
					type="number"
					name="decreaseSpeed"
					required
					class="w-full mt-1 p-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
				/>
			</div>

			<div class="form-group">
				<label for="restartCount" class="block font-medium text-gray-700"
					>Restart Count:</label
				>
				<input
					id="restartCount"
					v-model.number="restartCount"
					type="number"
					name="restartCount"
					required
					class="w-full mt-1 p-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
				/>
			</div>

			<div class="form-group">
				<label for="endGameCount" class="block font-medium text-gray-700"
					>End Game Count:</label
				>
				<input
					id="endGameCount"
					v-model.number="endGameCount"
					type="number"
					name="endGameCount"
					required
					class="w-full mt-1 p-2 border rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
				@click="submitForm"
			>
				Submit
			</button>
		</form>
	</section>
</template>
<script setup>
import SessionStatistics from '../services/sessionStatistics';
import { sessionStatsService } from '../services/sessionStatsService';
import { ref } from 'vue';

// Form data
const formData = ref({
	username: '',
	email: '',
	secondsPlayed: 0,
	increaseSpeed: 0,
	decreaseSpeed: 0,
	restartCount: 0,
	endGameCount: 0,
});

// Form fields
const username = ref('');
const email = ref('');
const seconds = ref(0);
const increaseSpeed = ref(0);
const decreaseSpeed = ref(0);
const restartCount = ref(0);
const endGameCount = ref(0);

// Submit form and create a new session statistics object
const submitForm = async () => {
	formData.value.username = username.value;
	formData.value.email = email.value;
	formData.value.secondsPlayed = seconds.value;
	formData.value.increaseSpeed = increaseSpeed.value;
	formData.value.decreaseSpeed = decreaseSpeed.value;
	formData.value.restartCount = restartCount.value;
	formData.value.endGameCount = endGameCount.value;

	const sessionStatistics = new SessionStatistics()
		.setUsername(formData.value.username)
		.setEmail(formData.value.email)
		.setSecondsPlayed(formData.value.secondsPlayed)
		.setAudioTextSpeedAdd(formData.value.increaseSpeed)
		.setAudioTextSpeedSubtract(formData.value.decreaseSpeed)
		.setGameRestartCount(formData.value.restartCount)
		.setGameEndCount(formData.value.endGameCount)
		.build();
	await sessionStatsService(sessionStatistics);
};
</script>
