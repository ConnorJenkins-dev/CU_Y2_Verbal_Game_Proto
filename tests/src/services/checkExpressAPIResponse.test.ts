import { expect, test } from 'vitest';
import { apiParamResponse, basicAPIResponse } from '../../../src/services/checkExpressAPIResponse';

test('server response should be ok', async () => {
	const response = await basicAPIResponse();
	expect(response.ok).toBe(true);
});

test('server should respond with: 1', async () => {
	const response = await basicAPIResponse();
	const text = await response.text();
	expect(text).toBe('1');
});

test('express should return parameter', async () => {
	const response = await apiParamResponse('1');
	const text = await response.text();
	expect(text).toBe('1');
});

test('express should return 400', async () => {
	const response = await apiParamResponse();
	expect(response.status).toBe(400);
});
