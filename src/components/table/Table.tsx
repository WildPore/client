// TODO Refactor to use render props (?) for creating each cell.
// Basically the columns render prop is a
// { column: string, Header: (any) => React.ReactNode, Cell: (any) => React.ReactRode }

import { createContext, useContext, useState } from 'react';

import styles from './Table.module.css';

import { Column } from '../../models/column';
import { useMousePosition } from '../../hooks/useMousePosition';

const ColumnContext = createContext<Column<any>[] | null>(null);

interface TableProps<T> {
	columns: Column<T>[];
	rows: T[];
	setRows: Function;
}

export default function Table<T extends object>({
	columns,
	rows,
	setRows,
}: TableProps<T>) {
	const [RowTooltip, rowDragHandlers] = useDrag(rows, setRows);
	const [columnState, setColumnState] = useState(columns);

	return (
		<div
			onMouseUp={() => rowDragHandlers.handleMouseUp()}
			onMouseMove={() => rowDragHandlers.handleMouseMove()}
			onMouseLeave={() => rowDragHandlers.handleMouseLeave()}
		>
			<RowTooltip />

			<table className={styles.table}>
				<thead>
					<tr>
						<th></th>
						{columnState.map(({ Header }) => (
							<th>
								<Header />
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<ColumnContext.Provider value={columnState}>
						{rows.map((row, index) => (
							// <tr onMouseEnter={() => rowDragHandlers.handleMouseEnter(index)}>
							// 	<td>
							// 		<button
							// 			title='row-handle'
							// 			type='button'
							// 			onMouseDown={() =>
							// 				rowDragHandlers.handleMouseDown(
							// 					<tr>
							// 						{columnState.map(({ Cell }: Column<T>) => (
							// 							<td>
							// 								<Cell row={row} />
							// 							</td>
							// 						))}
							// 					</tr>,
							// 					index
							// 				)
							// 			}
							// 		>
							// 			Handle
							// 		</button>
							// 	</td>
							// 	{columnState.map(({ Cell }: Column<T>) => (
							// 		<td>
							// 			<Cell row={row} />
							// 		</td>
							// 	))}
							// </tr>
							<Row
								index={index}
								title='row-whatever'
								value={row}
								onMouseDown={rowDragHandlers.handleMouseDown}
								onMouseEnter={rowDragHandlers.handleMouseEnter}
							/>
						))}
					</ColumnContext.Provider>
				</tbody>
			</table>
		</div>
	);
}

interface RowProps {
	index: number;
	title: string;
	value: any;
	onMouseDown: Function;
	onMouseEnter: Function;
}

function Row({ index, title, value, onMouseDown, onMouseEnter }: RowProps) {
	const cells = useContext(ColumnContext);

	// TODO It would be good to figure out what the preferred technique for handling a possibly null value is.
	if (!cells) {
		return <p>Error</p>;
	}

	return (
		<tr key={index}>
			<td>
				<button type='button' title={title}>
					Grip
				</button>
			</td>
			{cells.map(({ Cell }: any) => (
				<td>
					<Cell row={value} />
				</td>
			))}
		</tr>
	);
}

type TooltipProps = {
	children: React.ReactNode;
};

function Tooltip({ children }: TooltipProps) {
	const mousePosition = useMousePosition();

	if (mousePosition.x === null || mousePosition.y === null) {
		return <></>;
	}

	let offsetX = 5;
	let offsetY = 0;

	return (
		<div
			style={{
				position: 'absolute',
				left: `${mousePosition.x + offsetX}px`,
				top: `${mousePosition.y + offsetY}px`,
			}}
		>
			{children}
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

type UseDrag = [() => React.ReactElement, Handlers];

function useDrag(items: any[], setItems: Function): UseDrag {
	const [tooltip, setTooltip] = useState(() => <></>) as [any, Function];
	const [dragging, setDragging] = useState(false);
	const [initialRow, setInitialRow] = useState(0);
	const [targetRow, setTargetRow] = useState(0);

	function handleMouseDown(value: React.ReactNode, index: number) {
		setTooltip(value);
		setDragging(true);
		setInitialRow(index);
	}

	function handleMouseUp() {
		if (dragging) {
			const [newRow] = items.slice(initialRow, initialRow + 1);
			const newItems = items.filter((_, index) => initialRow !== index);
			newItems.splice(targetRow, 0, newRow);

			setItems(newItems);
		}

		setTooltip(<></>);
		setDragging(false);
	}

	function handleMouseMove() {}

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

	return [() => <Tooltip>{tooltip}</Tooltip>, handlers];
}

interface GripProps {
	value: any;
	onClick: () => void;
}

function Grip({ value, onClick }: GripProps) {
	return (
		<button type='button' title='column or row dnd grip'>
			Grip
		</button>
	);
}
