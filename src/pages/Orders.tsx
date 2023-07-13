import { useState } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import styles from './Orders.module.css';

import Table from '../components/table/Table';
import NewItemForm from '../components/NewItemForm';

import { readItemsFromOrder } from '../utils/orders';

import { Order } from '../models/order';
export interface OrdersLoaderData {
	orderId: number;
	pullSheet: Order[];
}

export async function ordersLoader({
	params,
}: LoaderFunctionArgs): Promise<OrdersLoaderData> {
	const pullSheet = await readItemsFromOrder(Number(params.id));

	return { orderId: Number(params.id), pullSheet };
}

async function ordersAction({}) {}

export default function Orders({}) {
	const { orderId, pullSheet } = useLoaderData() as OrdersLoaderData;

	const [rows, setRows] = useState(pullSheet);

	function handleCreateItem({ id, item, active, spare }: any) {
		console.log({ id, item, active, spare });
	}

	return (
		<>
			<NewItemForm onSubmit={handleCreateItem} />
			<Table rows={rows} setRows={setRows} />
		</>
	);
}
