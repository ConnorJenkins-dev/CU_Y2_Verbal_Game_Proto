<template>
	<main class="bg-amber-200">
		<section>
			<div class="grid grid-cols-3 gap-4 bg-amber-300">
				<!-- Flowchart Section -->
				<div class="flex flex-col items-center p-4">
					<Suspense>
						<Flowchart ref="flowchartRef" @setId="setId" />
					</Suspense>
				</div>

				<!-- Narrative Section -->
				<div class="flex flex-col justify-center p-4 bg-amber-300">
					<div
						class="w-full h-[350px] mt-3 overflow-y-scroll scrollbar-custom border border-amber-900 rounded-md shadow-inner shadow-amber-900"
					>
						<h1><Typewriter duration="40">Welcome to Aiko's Revenge</Typewriter></h1>
						<h3>
							<Typewriter duration="50">{{ narrative }}</Typewriter>
						</h3>
					</div>
					<div class="flex justify-center space-x-4 mt-5">
						<Button size="large" @click="handleOptionClick(option1NextStageId, 1)">{{
							option1
						}}</Button>
						<Button size="large" @click="handleOptionClick(option2NextStageId, 2)">{{
							option2
						}}</Button>
					</div>
					<div class="flex justify-center items-center gap-2">
						<Button size="small" class="p-2 mt-5" @click="startSttRecording()"
							>Speech-to-text</Button
						>
						<input
							v-model="customInput"
							type="text"
							placeholder="Custom Input"
							class="w-1/2 p-2 mt-5 border border-amber-900 rounded-md shadow-inner shadow-amber-900"
						/>
						<Button size="small" class="p-2 mt-5" @click="getChoiceAnalysis()"
							>Submit</Button
						>
					</div>

					<div>
						<Stt ref="sttRef" @updateText="updateText" />
					</div>
				</div>

				<!-- Image Section -->
				<div class="flex items-center justify-center p-4">
					<img
						:src="stageImage"
						alt="image of cowboy"
						class="object-cover h-full w-full rounded-md"
					/>
				</div>
			</div>
		</section>
	</main>
	<aside id="account_submission">
		<SessionForm />
	</aside>
</template>

<script setup lang="ts">
import Stt from './components/Stt.vue';
import Typewriter from './components/Typewriter.vue';
import Button from './components/NarrativeButton.vue';
import { onMounted, ref, computed } from 'vue';
import SessionForm from './components/SessionForm.vue';
import {
	getNarrativeById,
	getOption1ForNarrative,
	getOption2ForNarrative,
	addProgress,
	resetProgress,
} from './services/narrativeService.ts';
import { phraseMatch } from './services/openAiService.ts';
import Flowchart from './components/Flowchart.vue';

const narrative = ref('This is a test narrative.');
const option1 = ref('Option 1');
const option2 = ref('Option 2');
const option1NextStageId = ref<number | null>(null);
const option2NextStageId = ref<number | null>(null);
const id = ref(1);
const userId = ref(1);
const customInput = ref('');
const stagePicture = ref<string>('');
const flowchartRef = ref(null);
const sttRef = ref(null);

const setId = (newId: number) => {
	id.value = newId;
	fetchNarrative(id.value);
	fetchOptions(id.value);
};

const visitNode = () => {
	if (flowchartRef.value) {
		flowchartRef.value.visitNode(id.value.toString());
	} else {
		console.error('Flowchart reference not found.');
	}
};

const stageImage = computed(() => {
	const imagePath = `/Pictures/${stagePicture.value}`;
	return new URL(imagePath, import.meta.url).href;
});

interface Narrative {
	dialogue_sound_id: string;
	stage_picture: string;
	dialogue_text: string;
	decision_id: number;
	choice_id_1: number;
	choice_id_2: number;
}

interface OpenAIResponse {
	choice: string;
}

interface Choice {
	choice_id: number;
	next_stage_id: number;
	choice_text: string;
}

const fetchNarrative = async (id: number) => {
	try {
		const response: Narrative = await getNarrativeById(id);
		narrative.value = response.dialogue_text;
		stagePicture.value = response.stage_picture;
	} catch (error) {
		console.error(error);
	}
};

const fetchOptions = async (id: number) => {
	try {
		const option1Response: Choice = await getOption1ForNarrative(id);
		option1.value = option1Response.choice_text;
		option1NextStageId.value = option1Response.next_stage_id;

		const option2Response: Choice = await getOption2ForNarrative(id);
		option2.value = option2Response.choice_text;
		option2NextStageId.value = option2Response.next_stage_id;
	} catch (error) {
		console.error(error);
	}
};

// Function to handle button clicks
// Resets if nextStageId is 1
// Otherwise, adds progress, sets the next stage ID,
// and fetches the narrative and options for the next stage
const handleOptionClick = async (nextStageId: number | null, optionNumber: number) => {
	if (nextStageId === null) {
		console.warn('No next stage ID provided for this option.');
		return;
	}
	if (nextStageId === 1) {
		// Reset
		id.value = 1;
		await resetProgress(userId.value);
	} else {
		await addProgress(id.value, optionNumber, userId.value);
		id.value = nextStageId ?? 1;
	}
	visitNode();
	await fetchNarrative(id.value);
	await fetchOptions(id.value);
};

const startSttRecording = () => {
	sttRef.value.recordContinuous();
};

// Function to get choice analysis from OpenAI API
const getChoiceAnalysis = async (message: string = customInput.value) => {
	sttRef.value.stopRecording();
	const response: OpenAIResponse = await phraseMatch(message, option1.value, option2.value);
	const choice = response.choice.toLowerCase();
	if (!choice) {
		console.error('No response from OpenAI API.');
		return;
	}
	if (choice !== 'option1' && choice !== 'option2') {
		console.error('Invalid response from OpenAI API.');
		return;
	}
	const optionNumber = choice === 'option1' ? 1 : 2;
	const nextStageId = optionNumber === 1 ? option1NextStageId.value : option2NextStageId.value;
	await handleOptionClick(nextStageId, optionNumber);
	customInput.value = '';
};

// receive emit from STT
const updateText = (text: string) => {
	customInput.value = text;
};

// Runs on page load
onMounted(() => {
	fetchNarrative(id.value);
	fetchOptions(id.value);
});
</script>

<style scoped>
.scrollbar-custom::-webkit-scrollbar {
	width: 10px;
}

.scrollbar-custom::-webkit-scrollbar-track {
	background: #fddc6e;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
	background-color: #d19d00;
	border-radius: 10px;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
	background-color: #a37a00;
}
</style>
