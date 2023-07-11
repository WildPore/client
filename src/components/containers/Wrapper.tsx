import { useContext } from 'react';
import { LevelContext } from '../../contexts/LevelContext';

// TODO The use of the level context here might be unnecessary. I don't know if I can remove it, and it doesn't seem like it's necessary to remove right now.

import styles from './Wrapper.module.css';

export declare interface WrapperProps {
	children?: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
	const level = useContext(LevelContext);
	return (
		<LevelContext.Provider value={level}>
			<div className={styles.container}>{children}</div>
		</LevelContext.Provider>
	);
}
