export async function phraseMatch(phrase: string, option1: string, option2: string) {
	const prompt =
		'Match the phrase to one of two options. ' +
		'Reply with exactly one word: ' +
		'"option1", "option2", or "null" if no match. ' +
		'Use intent and sentiment to determine the best match. ' +
		"So don't just look for keywords. i.e., " +
		'If the options are "Turn Right" and "Turn Left", ' +
		'and the phrase is "Don\'t turn right", ' +
		'the best match is Turn Left. ' +
		'Only return null if the phrase has no relation to either option. ' +
		'Try to infer as much potential meaning as possible. ' +
		'\nBEGIN PHRASE ' +
		phrase +
		'\nEND PHRASE' +
		'\noption1: ' +
		option1 +
		'\noption2: ' +
		option2 +
		'\nWhich option matches the phrase? ' +
		'Remember, the only acceptable responses are "option1", "option2", or "null".';
	console.log(JSON.stringify({ prompt }));
	const response = await fetch('/api/openAi', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ prompt }),
	});
	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}
	return await response.json();
}
