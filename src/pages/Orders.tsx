import { useEffect, useRef, useState } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import styles from './Orders.module.css';

import Table from '../components/table/Table';

import { Order } from '../models/order';

import { readItemsFromOrder } from '../utils/orders';

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

export default function Orders({}) {
	const { orderId, pullSheet } = useLoaderData() as OrdersLoaderData;

	const [rows, setRows] = useState(pullSheet);

	return (
		<>
			<Table rows={rows} setRows={setRows} />
		</>
	);
}
