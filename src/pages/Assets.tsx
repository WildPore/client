import { useId, useReducer, useState } from 'react';

import { useLoaderData } from 'react-router-dom';

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

// [null, null, 1, null, null, 4, null, 3, 2]
// [1, 2, 3, 4, highest + 1, highest + 2, ...]

async function readItems(): Promise<any> {
	const response = await fetch(URL);
	const json = await response.json();

	const assets = json;
	let nextOrdering =
		json.reduce((max: number, asset: AssetUpdate) => {
			if (asset.ordering != null && asset.ordering > max) {
				return asset.ordering;
			}

			return max;
		}, 0) + 1;

	assets.forEach((asset: AssetUpdate) => {
		if (asset.ordering === null) {
			asset.ordering = nextOrdering++;
			updateItem(asset);
		}
	});

	// @ts-ignore
	assets.sort((a, b) => a.ordering - b.ordering);

	return assets;
}

export interface AssetsLoaderData {
	data: object[];
}

export async function assetsLoader(): Promise<AssetsLoaderData> {
	const data = await readItems();

	return { data };
}

interface AssetUpdate {
	[key: string]: unknown;
	id?: number;
	name?: string;
	maxHeld?: number;
	ordering?: number | null;
}

// TODO what is the return type of this really? Promise<JSON?, status?>
async function updateItem(asset: AssetUpdate): Promise<any> {
	const path = `${URL}/${asset.id}`;
	const body = Object.keys(asset)
		.filter((key) => key !== 'id')
		.reduce((res: AssetUpdate, key) => ((res[key] = asset[key]), res), {});

	const response = await fetch(path, {
		method: 'PATCH',
		// @ts-ignore
		headers: {
			Authorization: AUTH,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	return response.json();
}

async function deleteItem(asset: AssetUpdate) {
	const path = `${URL}/${asset.id}`;
	const response = await fetch(path, {
		method: 'DELETE',
		// headers: {
		// 	Authorization: AUTH,
		// 	'Content-Type': 'application/json',
		// },
	});

	console.log({ response });

	return response.json();
}

// The default is ascending
enum Direction {
	Up = -1,
	Down = 1,
}

async function reorderItem(index: number, direction: Direction) {
	// const newIndex = index + direction;
	// console.log(newIndex);
	// const path = `${URL}/${index}`;
	// const swapPath = `${URL}/${newIndex}`;
	// const response = await fetch(path, {
	// 	method: 'PATCH',
	// 	headers: {
	// 		Authorization: AUTH,
	// 		'Content-Type': 'application/json',
	// 	},
	// 	body: JSON.stringify({ ordering: newIndex }),
	// });
	// if (response.ok) {
	// 	const swapResponse = await fetch(swapPath, {
	// 		method: 'PATCH',
	// 		headers: {
	// 			Authorization: AUTH,
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify({ ordering: index }),
	// 	});
	// 	if (swapResponse.ok) {
	// 		return response.json();
	// 	}
	// }
}

export default function Assets() {
	let load = useLoaderData() as AssetsLoaderData;
	const [data, dispatch] = useReducer(dataReducer, load.data);

	function handleCreate(asset: Asset) {
		createItem(asset);
		dispatch({ type: 'created', asset });
	}

	function handleUpdate(index: number, update: AssetUpdate) {
		updateItem(update);
		dispatch({ type: 'updated', index, update });
	}

	function handleDelete(index: number, update: AssetUpdate) {
		deleteItem(update);
		dispatch({ type: 'deleted', index });
	}

	function handleReorder(index: number, direction: Direction) {
		if (index === 0 && direction === Direction.Up) {
			return;
		} else if (index === data.length && direction === Direction.Down) {
			return;
		}

		reorderItem(index, direction);
		dispatch({ type: 'reordered', index, direction });
	}

	function dataReducer(data: any[], action: any) {
		switch (action.type) {
			case 'created': {
				return [...data, action.asset];
			}

			case 'updated': {
				return data.map((_: any, i: number) =>
					// ideally would replace with something that just overwrites the changed value
					i === action.index ? action.update : _
				);
			}

			case 'deleted': {
				return data.filter((_: any, i: number) => i !== action.index);
			}

			case 'reordered': {
				// we know that there are no upwards first swaps,
				// or downwards last swaps

				const copy = [...data];
				const temp = copy[action.index].ordering;
				copy[action.index].ordering =
					copy[action.index + action.direction].ordering;
				copy[action.index + action.direction].ordering = temp;

				return copy;
			}

			default: {
				throw Error('Unknown action: ' + action.type);
			}
		}
	}

	return (
		<>
			<div className={styles.container}>
				<AddAsset handleCreate={handleCreate} />
				<div className={styles.header}>
					<p></p>
					<p></p>
					<p></p>
					<p>Item</p>
					<p>Quantity</p>
				</div>
				{data.map((entry: AssetUpdate, index: number) => (
					<div className={styles.row} key={index}>
						<Asset
							index={index}
							value={entry}
							setValue={handleUpdate}
							reorder={handleReorder}
							handleDelete={handleDelete}
						/>
					</div>
				))}
			</div>
		</>
	);
}

interface AssetProps {
	index: number;
	value: AssetUpdate;
	reorder?: any;
	setValue?: any;
	handleDelete?: any;
	delegated?: any;
}

function Asset({
	index,
	value,
	reorder,
	setValue,
	handleDelete,
	...delegated
}: AssetProps) {
	const inputId = useId();

	return (
		<div className={styles.asset}>
			<button onClick={() => reorder(index, Direction.Up)} type='button'>
				&uarr;
			</button>
			<p>{value.id}</p>
			<button onClick={() => reorder(index, Direction.Down)} type='button'>
				&darr;
			</button>
			<label htmlFor={inputId}>{value.name}</label>
			<input
				type='number'
				id={inputId}
				value={value.maxHeld}
				onChange={(event: any) =>
					setValue(index, {
						id: value.id,
						name: value.name,
						maxHeld: event.target.value,
					})
				}
				{...delegated}
			/>
			<button type='button' onClick={() => handleDelete(index, value)}>
				Delete
			</button>
		</div>
	);
}

interface Asset {
	name: string;
	maxHeld: number;
}

async function createItem(asset: Asset) {
	console.log(JSON.stringify(asset));
	const path = URL;
	const response = await fetch(path, {
		method: 'POST',
		headers: {
			Authorization: AUTH,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(asset),
	});

	return response.json();
}

function AddAsset({ handleCreate }: any) {
	const [itemName, setItemName] = useState('');
	const [itemQuantity, setItemQuantity] = useState(1);

	function handleSubmit(event: any) {
		event.preventDefault();

		handleCreate({ name: itemName, maxHeld: itemQuantity });

		setItemName('');
		setItemQuantity(1);
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.formrow}>
				<label htmlFor='item-name'>Item Name</label>
				<input
					type='text'
					name='item-name'
					id='item-name'
					placeholder='New item'
					value={itemName}
					onChange={(e) => setItemName(e.target.value)}
				/>
			</div>
			<div className={styles.formrow}>
				<label htmlFor='stock'>Stock</label>
				<input
					type='number'
					name='stock'
					id='stock'
					min={0}
					value={itemQuantity}
					onChange={(e) => setItemQuantity(Number(e.target.value))}
				/>
			</div>
			<button type='submit'>Add new asset</button>
		</form>
	);
}
