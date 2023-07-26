import { useReducer } from 'react';
import { LoaderFunctionArgs, Outlet, useLoaderData } from 'react-router-dom';

import { getItems, orderCreate, orderDelete, orderUpdate } from '../utils/http';

const URL = 'http://localhost:8080/events';

interface Event {
	id: number;
	name: string;
	startDate: Date;
	endDate: Date;
}

// @ts-ignore
async function handleDelete(id: number): Promise<boolean> {
	const response = await orderDelete(id);

	if (await response) {
		return true;
	} else {
		return false;
	}
}

export default function Event() {
	const { id, name, startDate, endDate, orderLoad, items } =
		useLoaderData() as EventLoaderData;

	const start = new Date(startDate);
	const end = new Date(endDate);

	const [order, dispatch] = useReducer(orderReducer, orderLoad);

	function handleSubmit(event: any) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const itemId = Number(formData.get('item-id'));
		const active = Number(formData.get('active'));
		const spare = Number(formData.get('spare'));

		const itemName: string = items[itemId].name;

		// @ts-ignore
		orderCreate(id, itemId, { active, spare });
		handleOrderCreate({ id, item: itemName, active, spare, fulfilled: 0 });
	}

	// @ts-ignore
	function handleOrderCreate(newOrder: OrderEntry) {
		dispatch({ type: 'created', newOrder });
	}

	function handleOrderUpdate(updatedOrder: OrderEntry) {
		const { active, spare, fulfilled } = updatedOrder;
		orderUpdate(updatedOrder.id, { active, spare, fulfilled });

		dispatch({ type: 'updated', updatedOrder });
	}

	function handleOrderDelete(deletedOrderId: OrderEntry['id']) {
		orderDelete(deletedOrderId);
		dispatch({ type: 'deleted', deletedOrderId });
	}

	function orderReducer(order: any[], action: any) {
		switch (action.type) {
			case 'created': {
				return [...order, action.newOrder];
			}

			case 'updated': {
				return order.map((o) => {
					if (o.id === action.updatedOrder.id) {
						return action.updatedOrder;
					} else {
						return o;
					}
				});
			}

			case 'deleted': {
				return order.filter((o) => o.id !== action.deletedOrderId);
			}

			default: {
				throw new Error('No reducer action.');
			}
		}
	}

	return (
		<>
			<h2>
				[{id}]: {name}{' '}
			</h2>
			<p>Starts: {start.toLocaleString()}</p>
			<p>Ends: {end.toLocaleString()}</p>

			<button>Change name</button>
			<button>Change start date</button>
			<button>Change end date</button>
			<button>Delete</button>

			<Outlet />
		</>
	);
}

export async function eventLoader({ params }: LoaderFunctionArgs) {
	// @ts-ignore
	const data = await readEvent(params.id);

	return { ...data[0], orderLoad: data.order, items: data.items };
}

async function readEvent(id: string) {
	const response = await fetch(`${URL}/${id}`);
	const json = await response.json();
	const order = await readOrder(id);
	const items = await readItems();

	return { ...json, order, items };
}

async function readOrder(eventId: string): Promise<object[]> {
	const response = await fetch(`http://localhost:8080/orders/${eventId}`);
	const json = await response.json();

	// HACK: Mirror "normalization" on the backend as well.
	// Since the backend doesn't check if the data makes sense,
	// I'm making sure that values that are null get set to 0.
	const normalized = json.map(
		({ id, item, active, spare, fulfilled }: OrderEntry) => ({
			id,
			item,
			active: active || 0,
			spare: spare || 0,
			fulfilled: fulfilled || 0,
		})
	);

	return normalized;
}

async function readItems() {
	const items = await getItems();

	return items;
}

export interface EventLoaderData {
	id: number;
	name: string;
	startDate: Date;
	endDate: Date;
	orderLoad: OrderEntry[];
	items: any;
}

interface OrderEntry {
	id: number;
	item: string;
	active: number;
	spare: number;
	fulfilled: number;
}

interface OrderProps {
	value: OrderEntry;
	handleUpdate: Function;
	handleDelete: Function;
}
