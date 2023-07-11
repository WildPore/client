import { useState } from 'react';

import styles from './InlineEditable.module.css';

export default function InlineEditable({}) {
	const [isEditing, setIsEditing] = useState(false);
	const [content, setContent] = useState('');

	return (
		<>
			{isEditing ? (
				<Container onClick={() => setIsEditing(true)}>
					<input
						type='text'
						name='inlineEditable'
						id='inlineEditable'
						value={content}
						onChange={(event) => setContent(event.target.value)}
					/>
				</Container>
			) : (
				<Container onClick={() => setIsEditing(false)}>
					<p>{content}</p>
				</Container>
			)}
		</>
	);
}

interface ContainerProps {
	children?: React.ReactNode;
	onClick: () => void;
	props: Props;
}

function Container({ children, onClick }: ContainerProps) {
	return (
		<div className={styles.container} onClick={onClick}>
			{children}
		</div>
	);
}
