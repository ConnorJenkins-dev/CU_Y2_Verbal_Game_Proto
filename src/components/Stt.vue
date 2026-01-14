// Reference:
//https://huggingface.co/docs/api-inference/en/tasks/automatic-speech-recognition?code=js
<script setup>
import { ref } from 'vue';
import { speechToText } from '../services/huggingFaceService';

const isRecording = ref(false);
const audioUrl = ref(null);
const errorMsg = ref('');
const textJson = ref('');
const text = ref('');
const state = ref('');

let mediaRecorder;

const emits = defineEmits(['updateText']);

function resetValues() {
	console.log('Resetting values');
	audioUrl.value = null;
	errorMsg.value = '';
	textJson.value = '';
	text.value = '';
	state.value = '';
}

function recordContinuous() {
	const audioChunks = [];
	try {
		// Ask for microphone access
		// eslint-disable-next-line no-undef
		navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
			// create the recorder object
			// eslint-disable-next-line no-undef
			mediaRecorder = new MediaRecorder(stream);

			// When data available, append to audioChunks and send to STT
			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					audioChunks.push(event.data);
					const audioBlob = new Blob(audioChunks);
					sTT(audioBlob);
				}
			};
			mediaRecorder.start(5000);
			isRecording.value = true;
		});
	} catch (error) {
		errorMsg.value = 'Error: ' + error;
		stopRecording();
	}
}

// Function to stop recording
function stopRecording() {
	// Stop recording
	mediaRecorder.stop();

	// Reset values
	resetValues();
	isRecording.value = false;
}

// Function to send auto to HuggingFace Service
async function sTT(audio) {
	textJson.value = await speechToText(audio);
	text.value = textJson.value.text;
	state.value = '';

	// Emit text to parent component
	emits('updateText', text.value);
}
defineExpose({
	stopRecording,
	recordContinuous,
});
</script>
<template></template>
