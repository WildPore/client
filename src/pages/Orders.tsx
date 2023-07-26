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

	// TODO Move this to an export from the implementation file.
	// Or anywhere it makes sense.
	type Row<T> = { row: T };

	// TODO Figure out how to get it so that I can just destructure in these function calls.
	const columns: Column<Order>[] = [
		{
			name: 'item',
			Header: () => <span>Item</span>,
			Cell: ({ row }: Row<Order>) => <span>{row.item}</span>,
		},
		{
			name: 'active',
			Header: () => <span>Active</span>,
			Cell: ({ row }: Row<Order>) => <span>{row.active}</span>,
		},
		{
			name: 'spare',
			Header: () => <span>Spare</span>,
			Cell: ({ row }: Row<Order>) => <span>{row.spare}</span>,
		},
		{
			name: 'Total',
			Header: () => <span>Total</span>,
			Cell: ({ row }: Row<Order>) => <span>{row.active + row.spare}</span>,
		},
		{
			name: 'fulfilled',
			Header: () => <span>Fulfilled</span>,
			Cell: ({ row }: any) => <span>{row.fulfilled}</span>,
		},
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
