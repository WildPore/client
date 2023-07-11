import styles from './Orders.module.css';

import Wrapper from '../containers/Wrapper';
import Heading from '../containers/Heading';
import Box from '../containers/Box';
import ExpandingBox from '../containers/ExpandingBox';

import Venue from '../business/Venue';
import DateBadge from '../business/Date';
import Flex from '../containers/Flex';
import Row from '../containers/Row';
import Column from '../containers/Column';

const fakeData = [
	{
		name: 'ShoWare is on fire',
		venue: (
			<Venue
				name='ShoWare Center'
				googleMaps='https://goo.gl/maps/gSw6mQCYrDXMVEn2A'
			/>
		),
		startDate: new Date('2023-06-10'),
		endDate: new Date('2023-06-12'),
		contents: [
			{ item: 'True1 Jump', quantity: 100, fulfilled: 0 },
			{ item: 'Cat6 Jump', quantity: 100, fulfilled: 0 },
		],
	},
];

export declare interface OrdersProps {
	//..
}

export default function Orders({}) {
	return (
		<>
			<Wrapper>
				<Heading>Orders</Heading>
				{fakeData.map((order) => (
					<Box>
						<Heading>Order: "{order.name}"</Heading>
						<Row styles={[styles.orderHeader]}>
							<Column>
								<p>Venue</p>
								<p>{order.venue}</p>
							</Column>
							<Row styles={[styles.dateContainer]}>
								<Column>
									<p>Start</p>
									<DateBadge value={order.startDate} />
								</Column>
								<Column>
									<p>End</p>
									<DateBadge value={order.endDate} />
								</Column>
							</Row>
						</Row>
						<Wrapper>
							<Heading>Pull</Heading>
							<ExpandingBox>
								{/* This should be some kind of expanding box. */}
								<ul>
									{order.contents.map(({ item, quantity }) => (
										<li>
											{item}: {quantity}
										</li>
									))}
								</ul>
							</ExpandingBox>
						</Wrapper>
					</Box>
				))}
			</Wrapper>
		</>
	);
}
