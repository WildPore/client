import styles from './Button.module.css';

interface ButtonRequirements {
	label: string;
}

interface ButtonOptions {
	classes?: string[];
}

export declare interface ButtonProps
	extends ButtonRequirements,
		ButtonOptions {}

export default function Button({ label, classes = [] }: ButtonProps) {
	return (
		<span className={[...classes].join(' ')}>
			<button className={styles.button} type='button'>
				{' '}
				{label}
			</button>
		</span>
	);
}
