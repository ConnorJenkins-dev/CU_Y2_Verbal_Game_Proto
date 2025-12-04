// Import and mock mariadb first, so that when the router is imported
// it doesn't create a real pool
vi.mock('mariadb');
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';

import router, { setMockDBPool } from '../../../../src/server/routes/narrative.ts';

describe('Express Router Tests', () => {
	let app: express.Express;
	let mockPool: { getConnection: vi.Mock };
	let mockConnection: { query: vi.Mock; release: vi.Mock };

	beforeEach(() => {
		mockConnection = {
			query: vi.fn(),
			release: vi.fn(),
		};
		mockPool = {
			getConnection: vi.fn().mockResolvedValue(mockConnection),
		};

		// Override the real pool with the mock pool
		//eslint-disable-next-line @typescript-eslint/no-explicit-any
		setMockDBPool(mockPool as any);

		// Create a test app mounting this router
		app = express();
		app.use(express.json());
		app.use('/api/narrative', router);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe('GET /api/narrative/', () => {
		it('should return all stages (200) with rows from DB', async () => {
			// Arrange
			const mockRows = [
				{ stage_id: 1, stage_name: 'Stage 1' },
				{ stage_id: 2, stage_name: 'Stage 2' },
			];
			mockConnection.query.mockResolvedValue(mockRows);

			// Act
			const res = await request(app).get('/api/narrative/');

			// Assert
			expect(res.status).toBe(200);
			expect(res.body).toEqual(mockRows);
			expect(mockConnection.query).toHaveBeenCalledWith('SELECT * FROM stages;');
			expect(mockConnection.release).toHaveBeenCalled();
		});
		it('should return 500 if the database throws an error', async () => {
			mockConnection.query.mockRejectedValue(new Error('DB Error'));

			const res = await request(app).get('/api/narrative/');

			expect(res.status).toBe(500);
			expect(res.text).toContain('database error');
			expect(mockConnection.release).toHaveBeenCalled();
		});
	});

	describe('GET /api/narrative/:id', () => {
		it('should return a stage by ID if it exists', async () => {
			const mockStage = [{ stage_id: 10, stage_name: 'Example Stage' }];
			mockConnection.query.mockResolvedValue(mockStage);

			const res = await request(app).get('/api/narrative/10');

			expect(res.status).toBe(200);
			expect(res.body).toEqual(mockStage[0]);
			expect(mockConnection.query).toHaveBeenCalledWith(
				'SELECT * FROM stages WHERE stage_id = ?;',
				['10'],
			);
		});

		it('should return 404 if the stage is not found', async () => {
			// Return an empty array to simulate "no result"
			mockConnection.query.mockResolvedValue([]);

			// Note the path is /api/narrative/999
			const res = await request(app).get('/api/narrative/999');

			expect(res.status).toBe(404);
			expect(res.text).toBe('stage not found');
		});

		it('should return 500 if there is a DB error', async () => {
			mockConnection.query.mockRejectedValue(new Error('DB Error'));

			// Make sure the path starts with /api/narrative
			const res = await request(app).get('/api/narrative/10');
			expect(res.status).toBe(500);
			expect(res.text).toContain('database error');
		});
	});

	describe('GET /api/narrative/:id/choice1', () => {
		it('should return the first choice for a stage', async () => {
			// Suppose the stage row returns { choice_id_1: 123 }
			mockConnection.query
				.mockResolvedValueOnce([{ choice_id_1: 123 }]) // for the stage query
				.mockResolvedValueOnce([{ choice_id: 123, text: 'Choice A' }]); // for the choice query

			const res = await request(app).get('/api/narrative/10/choice1');

			expect(res.status).toBe(200);
			expect(res.body).toEqual({ choice_id: 123, text: 'Choice A' });
		});

		it('should return 500 if there is a DB error', async () => {
			mockConnection.query.mockRejectedValue(new Error('DB Error'));

			const res = await request(app).get('/api/narrative/10/choice1');

			expect(res.status).toBe(500);
			expect(res.text).toContain('database error');
		});
	});

	describe('POST /api/narrative/:id/progress', () => {
		it('should update user progress', async () => {
			// Example test for optionNumber = 1
			mockConnection.query
				.mockResolvedValueOnce([{ progress: '0000000' }]) // userRow
				.mockResolvedValueOnce({}); // for the UPDATE

			const res = await request(app)
				.post('/api/narrative/3/progress')
				.send({ optionNumber: 1, currentUser: 42 });

			expect(res.status).toBe(200);
			// new progress would replace char at index=2 of '0000000' with '1'
			expect(res.body).toBe('0010000');
		});

		it('should return 400 if invalid option number', async () => {
			const res = await request(app)
				.post('/api/narrative/3/progress')
				.send({ optionNumber: 3, currentUser: 42 });

			expect(res.status).toBe(400);
			expect(res.text).toBe('invalid option number');
		});

		it('should return 500 on DB error', async () => {
			mockConnection.query.mockRejectedValue(new Error('DB Error'));

			const res = await request(app)
				.post('/api/narrative/3/progress')
				.send({ optionNumber: 1, currentUser: 42 });

			expect(res.status).toBe(500);
			expect(res.text).toContain('database error');
		});
	});

	describe('POST /api/narrative/progress/reset', () => {
		it('should reset progress to 28 zeros', async () => {
			mockConnection.query.mockResolvedValueOnce({});

			const res = await request(app)
				.post('/api/narrative/progress/reset')
				.send({ currentUser: 42 });

			expect(res.status).toBe(200);
			expect(res.body).toBe('progress reset');
			expect(mockConnection.query).toHaveBeenCalledWith(
				'UPDATE users SET progress = ? WHERE user_id = ?;',
				['0'.repeat(28), 42],
			);
		});

		it('should return 500 on DB error', async () => {
			mockConnection.query.mockRejectedValue(new Error('DB Error'));

			const res = await request(app)
				.post('/api/narrative/progress/reset')
				.send({ currentUser: 42 });

			expect(res.status).toBe(500);
			expect(res.text).toContain('database error');
		});
	});

	describe('GET /api/narrative/choiceCount/:stageId', () => {
		it('should return the percentage of users who have chosen stageId != 0', async () => {
			// Mock DB returning 3 total users. Two have chosen something, one has '0'
			mockConnection.query
				.mockResolvedValueOnce([
					{ progress: '010000000000000000000000000000' },
					{ progress: '000000000000000000000000000000' },
					{ progress: '020000000000000000000000000000' },
				])
				.mockResolvedValueOnce([{ 'COUNT(*)': 3 }]); // total user count

			// stageId=1 => index=0 => check first char in progress
			const res = await request(app).get('/api/narrative/choiceCount/2');

			expect(res.status).toBe(200);
			// 2 out of 3 have non-zero => ~66.6667%
			expect(res.body).toBeCloseTo(66.666, 1);
		});

		it('should return 500 if DB error', async () => {
			mockConnection.query.mockRejectedValue(new Error('DB Error'));

			const res = await request(app).get('/api/narrative/choiceCount/1');

			expect(res.status).toBe(500);
			expect(res.text).toContain('database error');
		});
	});
});
