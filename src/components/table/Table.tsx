// import Cell from './Cell';
import { useState } from 'react';
import styles from './Table.module.css';
import { Order } from '../../models/order';

interface TableProps {
	rows: Array<any>;
	setRows: Function;
}

export default function Table({ rows, setRows }: TableProps): JSX.Element {
	const [dragTooltip, position, isDragging, dragHandlers] = useDrag(
		rows,
		setRows
	);

	function rowReducer(rows: Array<any>, action: { row: any; type: string }) {
		switch (action.type) {
			case 'created': {
				return rows;
			}

			case 'updated': {
				return rows;
			}

			case 'deleted': {
				return rows;
			}

			default: {
				throw Error('Unknown action: ' + action.type);
			}
		}
	}

	return (
		<div
			onMouseUp={() => dragHandlers.handleMouseUp()}
			onMouseMove={(event) => dragHandlers.handleMouseMove(event)}
			onMouseLeave={() => dragHandlers.handleMouseLeave()}
		>
			<div
				style={{
					position: 'absolute',
					left: `${position.x}px`,
					top: `${position.y}px`,
					visibility: isDragging ? 'visible' : 'hidden',
				}}
			>
				{dragTooltip}
			</div>
			<table className={styles.table}>
				<thead>
					<tr>
						<th></th>
						<th>ID</th>
						<th>Item</th>
						<th>Active</th>
						<th>Spare</th>
						<th>Fulfilled</th>
						<th>Note</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row, index) => (
						<tr onMouseEnter={() => dragHandlers.handleMouseEnter(index)}>
							<td>
								<button
									type='button'
									onMouseDown={() => dragHandlers.handleMouseDown(index)}
								>
									Handle
								</button>
							</td>
							<td>{row.id}</td>
							<td>{row.item}</td>
							<td>{row.active}</td>
							<td>{row.spare}</td>
							<td>{row.fulfilled}</td>
							<td>{row.note}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

interface Handlers {
	handleMouseDown: Function;
	handleMouseUp: Function;
	handleMouseMove: Function;
	handleMouseEnter: Function;
	handleMouseLeave: Function;
}

function useDrag(
	items: any[],
	setItems: Function
): [
	React.ReactNode | null,
	{ x: number | null; y: number | null },
	boolean | null,
	Handlers
] {
	const [tooltip, setTooltip] = useState(null) as [
		React.ReactNode | null,
		Function
	];
	const [dragging, setDragging] = useState(false);
	const [initialRow, setInitialRow] = useState(0);
	const [targetRow, setTargetRow] = useState(0);
	const [mousePosition, setMousePosition] = useState({ x: null, y: null } as {
		x: number | null;
		y: number | null;
	});

	function handleMouseDown(index: number) {
		setDragging(true);
		setTooltip(items[index].item);
		setInitialRow(index);
	}

	function handleMouseUp() {
		if (dragging) {
			const [newRow] = items.slice(initialRow, initialRow + 1);
			const newItems = items.filter((_, index) => initialRow !== index);
			newItems.splice(targetRow, 0, newRow);

			setItems(newItems);
		}

		setDragging(false);
	}

	function handleMouseMove(event: any) {
		const offset = {
			x: 25,
			y: -15,
		};

		setMousePosition({
			x: event.clientX + offset.x,
			y: event.clientY - offset.y,
		});
	}

	function handleMouseEnter(index: number) {
		setTargetRow(index);
	}

	function handleMouseLeave() {
		setDragging(false);
	}

	const handlers: Handlers = {
		handleMouseDown,
		handleMouseUp,
		handleMouseMove,
		handleMouseEnter,
		handleMouseLeave,
	};

	return [tooltip, mousePosition, dragging, handlers];
}

function useStorage(data: any): [any, Function] {
	const [dataState, setDataState] = useState(data);

	function updateData(data: any) {}

	return [0, () => 0];
}
