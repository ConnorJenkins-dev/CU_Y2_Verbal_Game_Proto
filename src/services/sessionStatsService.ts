import { SessionData } from './sessionStatistics.ts';
import { checkUserInDB } from './userService.ts';

export async function sessionStatsService(sessionData: SessionData) {
	// Check if user is already in the database
	const username = sessionData.username;
	const response = await checkUserInDB(username);

	// If user does not exist, add user to the database
	const user = await response.user_id;

	// If user exists, set the user id
	if (user === null) {
		// Add user to the database
		await addNewUser(username);
		// Get the new user's id
		const newId = await checkUserInDB(username);
		// Set the user id
		sessionData.userId = await newId.user_id;
		await addSessionStats(sessionData);
	} else {
		sessionData.userId = user;
		await addSessionStats(sessionData);
	}
}
// Add session data to the database
async function addSessionStats(sessionData: SessionData) {
	console.log('sSS addSesh Called with data: ', sessionData);
	const response = await fetch('http://localhost:3000/api/sessionStats', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(sessionData),
	});
	if (!response.ok) {
		throw new Error(`Error: ${response.status}`);
	}
	return await response.json();
}

async function addNewUser(username: string) {
	const data = {
		username: username,
	};

	try {
		await fetch(`http://localhost:3000/api/getUsers/addUser/${username}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		}).then((response) => {
			if (response.status === 200) {
				console.log('Data sent successfully');
			}
		});
	} catch (error) {
		console.error(error);
	}
}
