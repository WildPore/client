import styles from './Date.module.css';

// Clicking on this should take the user to the calendar at that specific date.

export declare interface DateProps {
	value: Date;
}

const fakeDatePreferenceContext = {
	shortFormat: '',
	longFormat: '',
};

function formatDate(date: Date) {
	return date.toLocaleDateString(undefined, {
		year: '2-digit',
		month: 'short',
		day: '2-digit',
		weekday: 'short',
	});
}

export default function DateBadge({ value }: DateProps) {
	return (
		<span className={[styles.container, 'tone', 'tone1'].join(' ')}>
			{formatDate(value)}
		</span>
	);
}
