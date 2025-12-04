// Inspired by:
// https://blog.logrocket.com/exploring-advanced-design-patterns-vue-js/

import SessionData from '../sessionTypes.ts';

export default class SessionStatistics {
	private sessionData: SessionData;

	constructor() {
		this.sessionData = {
			userId: 0,
			username: '',
			email: '',
			secondsPlayed: 0,
			audioTextSpeedAdd: 0,
			audioTextSpeedSubtract: 0,
			gameRestartCount: 0,
			gameEndCount: 0,
		};
	}

	// Setters
	// Add username
	setUsername(username: string) {
		this.sessionData.username = username;
		return this;
	}

	setUserId(userId: number) {
		this.sessionData.userId = userId;
		return this;
	}

	setEmail(email: string) {
		this.sessionData.email = email;
		return this;
	}

	setSecondsPlayed(secondsPlayed: number) {
		this.sessionData.secondsPlayed = secondsPlayed;
		return this;
	}

	setAudioTextSpeedAdd(increaseSpeed: number) {
		this.sessionData.audioTextSpeedAdd = increaseSpeed;
		return this;
	}

	setAudioTextSpeedSubtract(decreaseSpeed: number) {
		this.sessionData.audioTextSpeedSubtract = decreaseSpeed;
		return this;
	}

	setGameRestartCount(restartCount: number) {
		this.sessionData.gameRestartCount = restartCount;
		return this;
	}
	setGameEndCount(endCount: number) {
		this.sessionData.gameEndCount = endCount;
		return this;
	}

	// Build session data
	build() {
		return this.sessionData;
	}

	getStatistics() {
		return this.sessionData;
	}
}
