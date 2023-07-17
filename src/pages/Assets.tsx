import { useLoaderData } from 'react-router-dom';

import { Item } from '../models/item';

import styles from './Assets.module.css';

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

export default function Assets() {
	let load = useLoaderData() as AssetsLoaderData;

	return (
		<>
			<p>
				{load.data.map((entry: Item) => (
					<span>{entry.name}</span>
				))}
			</p>
		</>
	);
}
