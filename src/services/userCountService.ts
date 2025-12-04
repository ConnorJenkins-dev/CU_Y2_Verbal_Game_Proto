export async function getUserCount(scale: string) {
	// If the scale is not 'week', 'month' or 'year', set to year
	if (scale !== 'week' && scale !== 'month' && scale !== 'year') {
		scale = 'year';
	}
	try {
		// Requests user data with a year scale
		const response = await fetch('http://localhost:3000/api/userGraph?type=' + scale);
		return await response.json();
	} catch (error) {
		console.error('Error:', error);
	}
}
