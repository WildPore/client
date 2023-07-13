import { Link, LinkProps } from 'react-router-dom';
import styles from './FullWidthLinkButton.module.css';

interface FullWidthLinkButtonProps extends LinkProps {
	display: string;
	delegated?: any;
}

export default function FullWidthLinkButton({
	display,
	...delegated
}: FullWidthLinkButtonProps) {
	return (
		<Link {...delegated} className={styles.link}>
			<button type='button' className={styles.button}>
				{display}
			</button>
		</Link>
	);
}
