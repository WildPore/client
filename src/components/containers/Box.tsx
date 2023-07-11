import { useContext } from 'react';
import { LevelContext } from '../../contexts/LevelContext';

import styles from './Box.module.css';

export declare interface BoxProps {
	children?: React.ReactNode;
}

export default function Box({ children }: BoxProps) {
	const level = useContext(LevelContext);
	const contentLevel = level + 1;

	return (
		<LevelContext.Provider value={contentLevel}>
			<div
				className={[
					styles.container,
					level % 2 === 0 ? styles.even : styles.odd,
				].join(' ')}
			>
				{children}
			</div>
		</LevelContext.Provider>
	);
}
