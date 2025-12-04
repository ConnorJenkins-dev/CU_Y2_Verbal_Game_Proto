// Checks if express is online and responsive
export async function basicAPIResponse() {
	return await fetch('http://localhost:3000/api/health');
}

// Allows error on this method as this should cause 400 error
export async function apiParamResponse(arg?: string) {
	let address = 'http://localhost:3000/api/health/param';
	if (arg) {
		let getUrl = address + '?param=' + arg;
		return await fetch(getUrl);
	} else return await fetch(address);
}
