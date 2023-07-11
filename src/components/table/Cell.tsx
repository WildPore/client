import { useState } from 'react';

import styles from './Cell.module.css';

interface CellRequirements {
	children?: React.ReactNode;
}

interface CellOptions {
	format?: string;
}

export declare interface CellProps extends CellRequirements, CellOptions {}

export default function Cell({ format = 'text', children }: CellProps) {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<td className={[styles.container, styles[format]].join(' ')}>
			<span>{children}</span>
		</td>
	);
}
