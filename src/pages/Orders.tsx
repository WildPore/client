import { useState } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

import { Order } from '../models/order';
import { Column } from '../models/column';

import Table from '../components/table/Table';
import NewItemForm from '../components/NewItemForm';

import { readItemsFromOrder } from '../utils/orders';

import styles from './Orders.module.css';

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

	const columns: Column<Order>[] = [
		{ name: 'item', display: 'Item', cell: (row) => row.item },
		{ name: 'active', display: 'Active', cell: (row) => row.active },
		{ name: 'spare', display: 'Spare', cell: (row) => row.spare },
		{ name: 'Total', display: 'Total', cell: (row) => row.active + row.spare },
		{ name: 'fulfilled', display: 'Fulfilled', cell: (row) => row.fulfilled },
	];

	const [rows, setRows] = useState(pullSheet);

	function handleCreateItem({ id, item, active, spare }: any) {
		console.log({ id, item, active, spare });
	}

	return (
		<>
			<NewItemForm onSubmit={handleCreateItem} />
			<Table<Order> columns={columns} rows={rows} setRows={setRows} />
		</>
	);
}
