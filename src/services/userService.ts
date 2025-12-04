export async function userService() {
	let address = 'http://localhost:3000/api/getUsers';
	try {
		const response = await fetch(address);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		return await response.json(); // This will contain the array of users
	} catch (error) {
		console.error('Error fetching users:', error);
		throw new Error('Failed to fetch users');
	}
}

export async function checkUserInDB(username: string) {
	let address = `http://localhost:3000/api/getUsers/${username}`;
	try {
		const response = await fetch(address);

		// If user is not found, return null
		if (response.status === 206) {
			return { user_id: null };
		}

		return await response.json();
	} catch (error) {
		console.error('Error fetching user:', error);
		throw new Error('Failed to fetch user');
	}
}

export async function addUser(username: string) {
	const data = {
		username: username,
	};
	// send data to the server
	try {
		await fetch(`http://localhost:3000/api/addUser${username}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
	} catch (error) {
		console.error(error);
	}
}
