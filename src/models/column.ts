export interface Column<T> {
	name: string;
	display: string;
	cell: (row: T) => React.ReactNode;
}
