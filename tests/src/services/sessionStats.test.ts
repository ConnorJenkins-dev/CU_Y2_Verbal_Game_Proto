import { test, expect, beforeEach } from 'vitest';
import SessionStatistics, { SessionData } from '../../../src/services/sessionStatistics';

// Object tests:

let sessionStats: SessionStatistics;

beforeEach(() => {
	sessionStats = new SessionStatistics();
});

// Tests one value in the sessionData object
test('should set username', () => {
	const username = 'John Doe';
	sessionStats.setUsername(username);
	const data = sessionStats.getStatistics();
	expect(data.username).toBe(username);
});

// Tests all values in the sessionData object
test('All fields should be set and return as expected', () => {
	const builtData: SessionData = sessionStats
		.setUsername('finalUser')
		.setEmail('final@example.com')
		.setSecondsPlayed(600)
		.setAudioTextSpeedAdd(10)
		.setAudioTextSpeedSubtract(5)
		.setGameRestartCount(1)
		.setGameEndCount(3)
		.build();

	const data = sessionStats.getStatistics();
	expect(data).toEqual(builtData);
});
