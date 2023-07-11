import styles from './Venue.module.css';

import Button from '../button/Button';

export declare interface VenueProps {
	name: string;
	googleMaps: string;
}

export default function Venue({ name, googleMaps }: VenueProps) {
	return (
		<a className={styles.link} href={googleMaps}>
			<Button label={name} classes={['tone4']} />
		</a>
	);
}
