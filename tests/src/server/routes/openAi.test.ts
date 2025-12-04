import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import dotenv from 'dotenv';

// Mock dotenv to avoid loading a real `.env` file
dotenv.config = vi.fn();

vi.mock('openai', () => {
	return {
		default: class MockOpenAI {
			chat = {
				completions: {
					create: vi.fn(async () => ({
						choices: [
							{
								message: { content: 'This is a mocked response' },
							},
						],
					})),
				},
			};
		},
	};
});

let app: ReturnType<typeof express>;

beforeEach(async () => {
	app = express();
	app.use(express.json());

	const { default: router, setMockOpenAIClient } = await import(
		'../../../../src/server/routes/openAi.ts'
	);

	// Inject mock OpenAI client into the router
	const MockOpenAI = (await import('openai')).default;
	setMockOpenAIClient(new MockOpenAI());

	app.use('/api/openAi', router);
});

describe('POST /api/openAi', () => {
	it('should return a valid response from the mocked OpenAI client', async () => {
		const mockPrompt = 'Hello, how are you?';
		const response = await request(app).post('/api/openAi').send({ prompt: mockPrompt });

		expect(response.status).toBe(200);
		expect(response.body).toHaveProperty('choice');
		expect(response.body.choice).toBe('This is a mocked response');
	});

	it('should handle missing prompt in the request body', async () => {
		const response = await request(app).post('/api/openAi').send({});

		expect(response.status).toBe(500);
	});
});
