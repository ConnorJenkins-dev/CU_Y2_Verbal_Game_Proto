// Checks if express is online and responsive
export async function basicAPIResponse() {
	return await fetch('/api/health');
}

// Allows error on this method as this should cause 400 error
export async function apiParamResponse(arg?: string) {
	let address = '/api/health/param';
	if (arg) {
		let getUrl = address + '?param=' + arg;
		return await fetch(getUrl);
	} else return await fetch(address);
}
