const apiKey = import.meta.env.VITE_API_KEY;

export async function speechToText(audio: Blob) {
	// const data = fs.readFileSync(audio);
	const response = await fetch(
		'https://api-inference.huggingface.co/models/openai/whisper-tiny.en',
		{
			headers: {
				Authorization: apiKey,
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: audio,
		},
	);

	if (response.ok) {
		return await response.json();
	} else {
		throw new Error('error' + response.json);
	}
}
