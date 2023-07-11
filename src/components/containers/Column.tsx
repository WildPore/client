import Flex from './Flex';

interface ColumnRequirements {
	children?: React.ReactNode;
}

interface ColumnOptions {
	styles?: string[];
}

export declare interface ColumnProps
	extends ColumnRequirements,
		ColumnOptions {}

export default function Column({ styles = [], children }: ColumnProps) {
	return (
		<Flex direction='column' styles={styles}>
			{children}
		</Flex>
	);
}
