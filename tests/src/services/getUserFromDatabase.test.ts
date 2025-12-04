import { describe, test, expect, vi } from 'vitest';
import { checkUserInDB, userService } from '../../../src/services/userService';

describe('userService', () => {
	test('should fetch and return users', async () => {
		// Mock response data
		const mockUsers = [
			{ id: 1, username: 'John Doe', password: 'test' },
			{ id: 2, username: 'Jane Doe', password: 'test' },
		];

		const expectedUsers = [
			{ id: 1, username: 'John Doe', password: 'test' },
			{ id: 2, username: 'Jane Doe', password: 'test' },
		];

		// Mock the global fetch function
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => mockUsers,
		});

		// Call the service function
		const data = await userService();

		// Assertions
		expect(data).toEqual(expectedUsers);
		expect(global.fetch).toHaveBeenCalledTimes(1); // Ensure fetch was called once
		expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/getUsers'); // Ensure fetch was called with the correct URL
	});

	test('should return an ID of 1', async () => {
		// Mock response data
		const mockUser = [{ id: 1, username: 'John Doe', password: 'test' }];
		// Mock the global fetch function
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: async () => mockUser,
		});

		// Call the service function user username as param
		const data = await checkUserInDB('John Doe');

		expect(data).toEqual([{ id: 1, username: 'John Doe', password: 'test' }]);
	});
});
