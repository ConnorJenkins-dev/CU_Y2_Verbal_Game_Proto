import { expect, test, vi, beforeEach } from 'vitest';
import { getUserCount } from '../../../src/services/userCountService';

// Mocking fetch
beforeEach(() => {
	vi.restoreAllMocks();
});

test('should call correct URL for year', async () => {
	global.fetch = vi.fn().mockResolvedValueOnce({
		json: async () => ({}),
		ok: true,
	});
	await getUserCount('year');
	expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/userGraph?type=year');
});

test('should call correct URL for month', async () => {
	global.fetch = vi.fn().mockResolvedValueOnce({
		json: async () => ({}),
		ok: true,
	});
	await getUserCount('month');
	expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/userGraph?type=month');
});

test('should call correct URL for week', async () => {
	global.fetch = vi.fn().mockResolvedValueOnce({
		json: async () => ({}),
		ok: true,
	});
	await getUserCount('week');
	expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/userGraph?type=week');
});

test('should fetch year when scale is invalid', async () => {
	global.fetch = vi.fn().mockResolvedValueOnce({
		json: async () => ({}),
		ok: true,
	});
	await getUserCount('invalid');
	expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/userGraph?type=year');
});
