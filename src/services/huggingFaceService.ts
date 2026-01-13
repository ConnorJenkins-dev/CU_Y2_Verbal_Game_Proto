// Using internal API to avoid CORS issues
export async function speechToText(audio: Blob) {
	const response = await fetch('http://localhost:3000/api/openai/stt', {
		method: 'POST',
		headers: {
			'Content-Type': audio.type || 'audio/webm', // or audio/wav, etc
		},
		body: audio,
	});

	if (!response.ok) {
		throw new Error(await response.text());
	}

	return await response.json();
}