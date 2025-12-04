import { describe, it, beforeEach, expect, vi } from 'vitest';
// Mock fetch
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

// Import services
import {
	getNarrativeById,
	getOption1ForNarrative,
	getOption2ForNarrative,
	getNarratives,
	addProgress,
	resetProgress,
	getPercent,
} from '../../../src/services/narrativeService';

describe('API Service Tests', () => {
	beforeEach(() => {
		mockFetch.mockClear();
	});

	it('should fetch a narrative by ID', async () => {
		const narrativeId = 1;
		const mockResponse = { id: narrativeId, name: 'Test Narrative' };
		mockFetch.mockResolvedValueOnce({ ok: true, json: () => mockResponse });

		const result = await getNarrativeById(narrativeId);

		expect(mockFetch).toHaveBeenCalledWith(
			`http://localhost:3000/api/narrative/${narrativeId}`,
		);
		expect(result).toEqual(mockResponse);
	});

	it('should handle 404 when fetching a narrative by ID', async () => {
		const narrativeId = 9999;
		mockFetch.mockResolvedValueOnce({ ok: false, status: 404, statusText: 'Not Found' });

		await expect(getNarrativeById(narrativeId)).rejects.toThrow('Error: 404 Not Found');
		expect(mockFetch).toHaveBeenCalledWith(
			`http://localhost:3000/api/narrative/${narrativeId}`,
		);
	});

	it('should fetch option 1 for a narrative', async () => {
		const narrativeId = 1;
		const mockResponse = { choice: 'Option 1' };
		mockFetch.mockResolvedValueOnce({ ok: true, json: () => mockResponse });

		const result = await getOption1ForNarrative(narrativeId);

		expect(mockFetch).toHaveBeenCalledWith(
			`http://localhost:3000/api/narrative/${narrativeId}/choice1`,
		);
		expect(result).toEqual(mockResponse);
	});

	it('should fetch option 2 for a narrative', async () => {
		const narrativeId = 1;
		const mockResponse = { choice: 'Option 2' };
		mockFetch.mockResolvedValueOnce({ ok: true, json: () => mockResponse });

		const result = await getOption2ForNarrative(narrativeId);

		expect(mockFetch).toHaveBeenCalledWith(
			`http://localhost:3000/api/narrative/${narrativeId}/choice2`,
		);
		expect(result).toEqual(mockResponse);
	});

	it('should fetch all narratives', async () => {
		const mockResponse = [
			{ id: 1, name: 'Narrative 1' },
			{ id: 2, name: 'Narrative 2' },
		];
		mockFetch.mockResolvedValueOnce({ ok: true, json: () => mockResponse });

		const result = await getNarratives();

		expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/api/narrative');
		expect(result).toEqual(mockResponse);
	});

	it('should add progress for a user', async () => {
		const narrativeId = 1;
		const optionNumber = 2;
		const currentUser = 123;
		const mockResponse = '1234';
		mockFetch.mockResolvedValueOnce({ ok: true, json: () => mockResponse });

		const result = await addProgress(narrativeId, optionNumber, currentUser);

		expect(mockFetch).toHaveBeenCalledWith(
			`http://localhost:3000/api/narrative/${narrativeId}/progress`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ optionNumber, currentUser }),
			},
		);
		expect(result).toEqual(mockResponse);
	});

	it('should handle invalid option number when adding progress', async () => {
		const narrativeId = 1;
		const optionNumber = 3;
		const currentUser = 123;
		mockFetch.mockResolvedValueOnce({ ok: false, status: 400, statusText: 'Bad Request' });

		await expect(addProgress(narrativeId, optionNumber, currentUser)).rejects.toThrow(
			'Error: 400 Bad Request',
		);
		expect(mockFetch).toHaveBeenCalledWith(
			`http://localhost:3000/api/narrative/${narrativeId}/progress`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ optionNumber, currentUser }),
			},
		);
	});

	it('should reset progress for a user', async () => {
		const currentUser = 123;
		const mockResponse = 'progress reset';
		mockFetch.mockResolvedValueOnce({ ok: true, json: () => mockResponse });

		const result = await resetProgress(currentUser);

		expect(mockFetch).toHaveBeenCalledWith(
			'http://localhost:3000/api/narrative/progress/reset',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ currentUser }),
			},
		);
		expect(result).toEqual(mockResponse);
	});

	it('should get percent progress for a stage', async () => {
		const stageId = '1';
		const mockResponse = 75;
		mockFetch.mockResolvedValueOnce({ ok: true, json: () => mockResponse });

		const result = await getPercent(stageId);

		expect(mockFetch).toHaveBeenCalledWith(
			`http://localhost:3000/api/narrative/choiceCount/${stageId}`,
		);
		expect(result).toEqual(mockResponse);
	});

	it('should throw an error if fetch fails', async () => {
		const narrativeId = 1;
		mockFetch.mockResolvedValueOnce({ ok: false, status: 404, statusText: 'Not Found' });

		await expect(getNarrativeById(narrativeId)).rejects.toThrow('Error: 404 Not Found');
	});
});
