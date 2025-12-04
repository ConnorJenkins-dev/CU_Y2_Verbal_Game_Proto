<script setup>
import { ref } from 'vue';

const loginVisible = ref(true);

// toggle loginVisible to true
const showLogin = () => {
	loginVisible.value = true;
};

// toggle loginVisible to false
const showSignup = () => {
	loginVisible.value = false;
};
</script>

<template>
	<main class="flex justify-center items-center h-screen">
		<div class="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
			<!--      Log-in form, Will need visibility toggled-->
			<form v-if="loginVisible" id="login">
				<h1 class="text-2xl font-semibold text-cenjm,loter text-gray-800 mb-4">Login</h1>
				<div class="mb-4">
					<label for="username" class="block text-gray-700 font-medium mb-1"
						>Username:</label
					>
					<input
						id="username"
						type="text"
						name="username"
						class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
					/>
				</div>
				<div class="mb-4">
					<label for="password" class="block text-gray-700 font-medium mb-1"
						>Password:</label
					>
					<input
						id="password"
						type="password"
						name="password"
						class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
					/>
				</div>
				<div class="mb-4">
					<a href="/passwordReset" class="text-sm text-blue-500 hover:text-blue-700"
						>Forgot password?</a
					>
				</div>
				<div>
					<button
						type="submit"
						class="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Login
					</button>
				</div>
				<button
					id="toggle"
					class="w-full my-5 bg-gray-200 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
					@click="showSignup"
				>
					Dont have an account? Sign Up here!
				</button>
			</form>

			<!--      Sign-up form, Will need visibility toggled also-->
			<form v-if="!loginVisible" id="signup">
				<h1 class="text-2xl font-semibold text-center text-gray-800 mb-4">Sign Up</h1>
				<div class="mb-4">
					<label for="username" class="block text-gray-700 font-medium mb-1"
						>Username:</label
					>
					<input
						id="username"
						type="text"
						name="username"
						class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
					/>
				</div>
				<div class="mb-4">
					<label for="fname" class="block text-gray-700 font-medium mb-1"
						>First Name:</label
					>
					<input
						id="fname"
						type="text"
						name="fname"
						class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
					/>
				</div>
				<div class="mb-4">
					<label for="lname" class="block text-gray-700 font-medium mb-1"
						>Last Name:</label
					>
					<input
						id="lname"
						type="text"
						name="lname"
						class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
					/>
				</div>
				<div class="mb-4">
					<label for="email" class="block text-gray-700 font-medium mb-1">Email:</label>
					<input
						id="email"
						type="email"
						name="email"
						class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
					/>
				</div>
				<div class="mb-4">
					<label for="password" class="block text-gray-700 font-medium mb-1"
						>Password:</label
					>
					<input
						id="password"
						type="password"
						name="password"
						class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
					/>
				</div>
				<div>
					<button
						type="submit"
						class="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						Sign Up
					</button>
				</div>
				<button
					id="toggle"
					class="w-full my-5 bg-gray-200 text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
					@click="showLogin"
				>
					Already have an account? Login here!
				</button>
			</form>
		</div>
	</main>
</template>
