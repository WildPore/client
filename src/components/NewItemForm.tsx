import { useId, useState } from 'react';

import styles from './NewItemForm.module.css';

import { Item } from '../models/item';
const items: Item[] = await readItemsFromDB();

interface NewItemFormProps {
	onSubmit: Function;
}

export default function NewItemForm({
	onSubmit,
}: NewItemFormProps): JSX.Element {
	const [itemId, setItemId] = useState(-1);
	const [active, setActive] = useState(0);
	const [spare, setSpare] = useState(0);

	function handleSubmit(event: any) {
		event.preventDefault();
		const item = items.filter(({ id }) => id === itemId)[0].name;
		onSubmit({ id: itemId, item, active, spare });
	}

	return (
		<div className={styles.formWrapper}>
			<form action='' onSubmit={handleSubmit} className={styles.form}>
				<p>{itemId}</p>
				<div className={styles.formRow}>
					<label htmlFor='item-name'>Item</label>
					<select
						name='item-name'
						id='item-name'
						value={itemId}
						onChange={(event: any) => setItemId(Number(event.target.value))}
					>
						<option value={-1} disabled>
							Choose Item...
						</option>
						{items.map(({ id, name }) => (
							<option value={id}>{name}</option>
						))}
					</select>
				</div>

				<div className={styles.formRow}>
					<InputNumber
						display={'Active'}
						value={active}
						setValue={setActive}
						min={0}
					/>
				</div>

				<div className={styles.formRow}>
					<InputNumber
						display={'Spare'}
						value={spare}
						setValue={setSpare}
						min={0}
					/>
				</div>

				<div className={styles.formRow}>
					<p>Total</p>
					<p>{active + spare}</p>
				</div>

				<button className={styles.fullWidth} type='submit'>
					Add Item
				</button>
			</form>
		</div>
	);
}

interface InputNumberProps extends React.ComponentPropsWithoutRef<'input'> {
	display: string;
	value: any;
	setValue: Function;
}

function InputNumber({
	display,
	value,
	setValue,
	...delegated
}: InputNumberProps): JSX.Element {
	const inputId = useId();
	const name = display.toLowerCase();

	return (
		<>
			<label htmlFor={name}>{display}</label>
			<input
				type='number'
				name={name}
				id={inputId}
				value={value}
				onChange={(event: any) => setValue(Number(event.target.value))}
				{...delegated}
			/>
		</>
	);
}

async function readItemsFromDB(): Promise<Item[]> {
	const response = await fetch('http://localhost:8080/items', {
		method: 'GET',
		headers: {},
	});

	const items = await response.json();

	return items;
}
