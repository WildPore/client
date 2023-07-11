import { Order } from '../models/order';

const BASE_URL = 'http://localhost:8080/orders';

export async function readItemsFromOrder(eventId: number): Promise<Order[]> {
	const response = await fetch(BASE_URL + `/${eventId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});

	const order = await response.json();
	return order;
}
