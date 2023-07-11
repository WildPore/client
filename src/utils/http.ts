const BASE_URL = 'http://localhost:8080';

const buildRoute = (path: string, ...params: any[]) => {
	let restOfUrl = '';
	params.forEach((param) => (restOfUrl += `/${param.toString()}`));

	return BASE_URL + path + restOfUrl;
};

async function grabAuth() {
	// HACK
	// Major hack, there needs to be something that actually tries to auth.

	const response = await fetch(buildRoute('/users/login'), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify({ username: 'lparnell', password: 'admin' }),
	});

	if (!response.ok) {
		const message = `An error has occured: ${response.status}`;
		throw new Error(message);
	}

	const token = await response.json();
	return token;
}

export async function getItems(): Promise<any> {
	const response = await fetch(buildRoute('/items'), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
	const json = await response.json();

	return json;
}

export async function orderCreate(
	eventId: number,
	itemId: number,
	details: { active: number; spare: number }
) {
	console.log(eventId, itemId, details);
	console.log(buildRoute('/orders', eventId, itemId));

	const response = await fetch(buildRoute('/orders', eventId, itemId), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify(details),
	});

	const json = await response.json();
	return json;
}

export async function orderUpdate(orderId: number, updatedValues: object) {
	const response = await fetch(buildRoute('/orders', orderId), {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
		body: JSON.stringify(updatedValues),
	});

	if (!response.ok) {
		const message = `Unable to update order: ${response.status}`;
		throw new Error(message);
	}

	const json = await response.json();
	return json;
}

export async function orderDelete(orderId: number) {
	const response = await fetch(buildRoute('/orders', orderId), {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});

	const json = await response.json();
	return json;
}
