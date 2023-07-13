import { Link } from 'react-router-dom';

import Card from '../cards/Card';

import FullWidthLinkButton from '../button/FullWidthLinkButton';

interface EventCardProps {
	id: number;
	name: string;
	startDate: Date;
	endDate: Date;
}

export default function EventCard({
	id,
	name,
	startDate,
	endDate,
}: EventCardProps) {
	const formatDate = (date: Date) =>
		new Date(date).toLocaleDateString('en-US', {
			dateStyle: 'medium',
		});

	const startDateFormatted = formatDate(startDate);
	const endDateFormatted = formatDate(endDate);

	return (
		<Card header={<FullWidthLinkButton to={`/events/${id}`} display={name} />}>
			<p>
				{startDateFormatted} to {endDateFormatted}
			</p>
		</Card>
	);
}
