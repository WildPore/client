// import Cell from './Cell';
import { useState } from 'react';
import styles from './Table.module.css';
import { Column } from '../../models/column';

interface TableProps<T> {
	columns: Column<T>[];
	rows: T[];
	setRows: Function;
}

export default function Table<T extends object>({
	columns,
	rows,
	setRows,
}: TableProps<T>): JSX.Element {
	const [columnState, setColumnState] = useState(columns);

	const [dragTooltip, position, isDragging, dragHandlers] = useDrag(
		rows,
		setRows,
		() => 'okay'
	);

	const [
		columnDragTooltip,
		columnTooltipPosition,
		columnIsDragging,
		columnDragHandlers,
	] = useDrag(columnState, setColumnState, ({ display }: Column<T>) => (
		<>{display}</>
	));

	// const [ColTooltip, colDndHandlers]: [React.ReactNode, Function[]]
	// useDnd(state: [value, setValue], tooltipConstructor)

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
			{dragTooltip}T{/* <ColTooltip /> */}
			<div
				style={{
					position: 'absolute',
					left: `${columnTooltipPosition.x}px`,
					top: `${columnTooltipPosition.y}px`,
					visibility: columnIsDragging ? 'visible' : 'hidden',
				}}
			>
				{columnDragTooltip}
			</div>
			<table className={styles.table}>
				<thead
					onMouseUp={() => columnDragHandlers.handleMouseUp()}
					onMouseMove={(event) => columnDragHandlers.handleMouseMove(event)}
					onMouseLeave={() => columnDragHandlers.handleMouseLeave()}
				>
					<tr>
						<th></th>
						{columns.map(({ display }: Column<T>, index) => (
							<th
								onMouseEnter={() => columnDragHandlers.handleMouseEnter(index)}
							>
								<button
									type='button'
									onMouseDown={() => columnDragHandlers.handleMouseDown(index)}
								>
									{display}
								</button>
							</th>
						))}
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
							{columns.map(({ cell }: Column<T>) => (
								<td>{cell(row)}</td>
							))}
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
	setItems: Function,
	dndTooltip: (arg: any) => React.ReactNode
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

	function Tooltip(content: React.ReactNode) {
		return (
			<div
				style={{
					position: 'absolute',
					left: `${mousePosition.x}px`,
					top: `${mousePosition.y}px`,
					// visibility: dragging ? 'visible' : 'hidden',
				}}
			>
				{content}
			</div>
		);
	}

	function handleMouseDown(index: number) {
		setDragging(true);
		setInitialRow(index);
		setTooltip(Tooltip('Tooltip'));

		console.log(items[index]);
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
		if (!dragging) {
			return;
		}

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
