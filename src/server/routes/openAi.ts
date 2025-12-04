import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

let OpenAI: typeof import('openai').default | null = null;
let openaiInstance: InstanceType<typeof OpenAI> = null;

// Factory to get OpenAI client
export const getOpenAIClient = async () => {
	if (!openaiInstance) {
		if (!OpenAI) {
			OpenAI = (await import('openai')).default; // Dynamically load OpenAI
		}
		openaiInstance = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || 'default-test-key' });
	}
	return openaiInstance;
};

// For testing: expose a way to override OpenAI because the server gets loaded before the tests
export const setMockOpenAIClient = (mockClient: InstanceType<typeof OpenAI>) => {
	openaiInstance = mockClient;
};

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
	const message: string = req.body.prompt;
	if (!message) {
		return res.status(500).json({ choice: 'null' });
	}

	const openai = await getOpenAIClient();

	const completion = await openai.chat.completions.create({
		model: 'gpt-4o-mini',
		messages: [
			{
				role: 'system',
				content: 'I am a helpful assistant',
			},
			{
				role: 'user',
				content: message,
			},
		],
	});

	res.status(200).json({ choice: completion.choices[0].message.content });
});

export default router;
