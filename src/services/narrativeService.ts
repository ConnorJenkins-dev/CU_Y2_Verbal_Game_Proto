export async function getNarrativeById(narrativeId: number) {
	const response = await fetch(`http://localhost:3000/api/narrative/${narrativeId}`);
	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}
	return await response.json();
}

export async function getOption1ForNarrative(narrativeId: number) {
	const response = await fetch(`http://localhost:3000/api/narrative/${narrativeId}/choice1`);
	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}
	return await response.json();
}

export async function getOption2ForNarrative(narrativeId: number) {
	const response = await fetch(`http://localhost:3000/api/narrative/${narrativeId}/choice2`);
	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}
	return await response.json();
}

export async function getNarratives() {
	const response = await fetch('http://localhost:3000/api/narrative');
	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}
	return await response.json();
}

export async function addProgress(narrativeId: number, optionNumber: number, currentUser: number) {
	const response = await fetch(`http://localhost:3000/api/narrative/${narrativeId}/progress`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ optionNumber: optionNumber, currentUser: currentUser }),
	});
	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}
	return await response.json();
}

export async function resetProgress(currentUser: number) {
	const response = await fetch(`http://localhost:3000/api/narrative/progress/reset`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ currentUser: currentUser }),
	});
	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}
	return await response.json();
}

export async function getPercent(stageId: string) {
	const response = await fetch(`http://localhost:3000/api/narrative/choiceCount/${stageId}`);
	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}
	return await response.json();
}
