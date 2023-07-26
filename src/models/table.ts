export type Row<T> = { row: T };

export interface Column<T> {
	name: string;
	Header: () => JSX.Element;
	Cell: (row: any) => JSX.Element;
}
