import Column from '../containers/Column';
import styles from './Card.module.css';

interface CardRequirements {
	header?: React.ReactNode;
	children?: React.ReactNode;
}

interface CardOptions {}

export declare interface CardProps extends CardRequirements, CardOptions {}

export default function Card({ header, children }: CardProps) {
	return (
		<section className={styles.card}>
			<Column>
				<div className={styles.headerWrapper}>{header}</div>
				<div className={styles.contentWrapper}>
					<Column>{children}</Column>
				</div>
			</Column>
		</section>
	);
}
