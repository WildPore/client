import Column from '../containers/Column';
import styles from './Card.module.css';

interface CardRequirements {
	title?: string;
	children?: React.ReactNode;
}

interface CardOptions {}

export declare interface CardProps extends CardRequirements, CardOptions {}

export default function Card({ title, children }: CardProps) {
	return (
		<section className={styles.card}>
			<Column>
				<div className={styles.titleWrapper}>
					<p className={styles.title}>{title}</p>
				</div>
				<div className={styles.contentWrapper}>
					<Column>{children}</Column>
				</div>
			</Column>
		</section>
	);
}
