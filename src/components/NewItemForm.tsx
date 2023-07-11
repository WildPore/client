import { useId, useState } from 'react';

import styles from './NewItemForm.module.css';

import { Item } from '../models/item';

interface NewItemFormProps {
	items: Item[];
}

export default function NewItemForm({ items }: NewItemFormProps): JSX.Element {
	const [active, setActive] = useState(0);
	const [spare, setSpare] = useState(0);

	function handleSubmit(event: any) {
		event.preventDefault();
		// ...
	}

	return (
		<div className={styles.formWrapper}>
			<form action='' onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.formRow}>
					<label htmlFor='item-name'>Item</label>
					<select name='item-name' id='item-name'>
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

				<button className={styles.fullWidth} type='button'>
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
