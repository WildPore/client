import Flex from './Flex';

interface RowRequirements {
	children?: React.ReactNode;
}

interface RowOptions {
	styles?: string[];
}

export declare interface RowProps extends RowRequirements, RowOptions {}

export default function Row({ styles = [], children }: RowProps) {
	return (
		<Flex direction='row' styles={styles}>
			{children}
		</Flex>
	);
}
