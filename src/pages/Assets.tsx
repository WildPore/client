import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Row, Column } from '../models/table';
import { Item } from '../models/item';

import styles from './Assets.module.css';

import Table from '../components/table/Table';

const URL = 'http://localhost:8080/items';
const AUTH = login();

async function login() {
	const response = await fetch('http://localhost:8080/users/login', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},

		body: JSON.stringify({ username: 'lparnell', password: 'admin' }),
	});

	return response;
}

async function readItems(): Promise<any> {
	const response = await fetch(URL);
	const assets = await response.json();

	return assets;
}

export interface AssetsLoaderData {
	data: Item[];
}

export async function assetsLoader(): Promise<AssetsLoaderData> {
	const data = await readItems();

	return { data };
}

// Implementing table in this page.
// Need a model for the asset data

const assetColumns: Array<Column<Item>> = [
	{
		name: 'maxHeld',
		Header: () => <span>Max Held</span>,
		Cell: ({ row }: Row<Item>) => <span>{row.maxHeld}</span>,
	},
	{
		name: 'name',
		Header: () => <span>Item</span>,
		Cell: ({ row }: Row<Item>) => <span>{row.name}</span>,
	},
	{
		name: 'findEvents',
		Header: () => <span>Find events with this item</span>,
		Cell: () => <button type='button'>Find</button>,
	},
];

export default function Assets() {
	let load = useLoaderData() as AssetsLoaderData;

	const [items, setItems] = useState(load.data);

	return (
		<>
			<Table<Item> columns={assetColumns} rows={items} setRows={setItems} />
		</>
	);
}
