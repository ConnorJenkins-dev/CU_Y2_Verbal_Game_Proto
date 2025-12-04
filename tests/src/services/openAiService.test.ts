import { describe, test, expect, vi } from 'vitest';
import { phraseMatch } from '../../../src/services/openAiService';

describe('phraseMatch', () => {
	test('should return the best match', async () => {
		const phrase = "Don't turn right";
		const option1 = 'Turn Right';
		const option2 = 'Turn Left';

		const expectedMatch = 'Turn Left';

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

		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => ({ choice: 'Turn Left' }),
		});

		const data = await phraseMatch(phrase, option1, option2);

		expect(data.choice).toBe(expectedMatch);
		expect(global.fetch).toHaveBeenCalledTimes(1);
		expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/openAi', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ prompt }),
		});
	});
});
