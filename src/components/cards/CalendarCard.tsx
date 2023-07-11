import styles from './CalendarCard.module.css';

interface CalendarCardRequirements {
	icon: React.ReactNode;
	title: string;
	dates: string;
}

interface CalendarCardOptions {
	backgroundColor?: string;
}

export declare interface CalendarCardProps
	extends CalendarCardRequirements,
		CalendarCardOptions {}

export default function CalendarCard({
	icon,
	title,
	dates,
	backgroundColor = 'random',
}: CalendarCardProps) {
	// TODO Icon prop
	const Icon = icon;

	// TODO Title
	return (
		<section className={styles.card}>
			<div className={styles.titleContainer}>
				<div className={styles.iconBox}>
					<Icon className={styles.icon} />
				</div>
				<div className={styles.title}>
					<p>{title}</p>
				</div>
				<div className={styles.dates}>
					<p>{dates}</p>
				</div>
			</div>
			<></>
		</section>
	);
}
