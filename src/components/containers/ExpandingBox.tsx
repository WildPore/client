import { useState, useContext } from 'react';
import { LevelContext } from '../../contexts/LevelContext';

import boxStyles from './Box.module.css';
import styles from './ExpandingBox.module.css';

export declare interface ExpandingBoxProps {
	//...
	children?: React.ReactNode;
}

export default function ExpandingBox({ children }: ExpandingBoxProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	const level = useContext(LevelContext);
	const contentLevel = level + 1;

	function handleClick() {
		setIsExpanded(!isExpanded);
	}

	return (
		<LevelContext.Provider value={contentLevel}>
			<div
				onClick={handleClick}
				className={[
					styles.container,
					isExpanded ? '' : styles.collapsed,
					boxStyles.container,
					level % 2 === 0 ? boxStyles.even : boxStyles.odd,
				].join(' ')}
			>
				{children}
				{!isExpanded && <div className={styles.expandButton}></div>}
			</div>
		</LevelContext.Provider>
	);
}
