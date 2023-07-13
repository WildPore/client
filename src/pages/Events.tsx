import { useReducer } from 'react';
import { useLoaderData } from 'react-router-dom';

import EventCard from '../components/eventCard/EventCard';

interface Event {
	id: number;
	name: string;
	startDate: Date;
	endDate: Date;
}

const URL = 'http://localhost:8080/events';

async function readEvents(): Promise<Event[]> {
	const response = await fetch(URL);
	const json = await response.json();

	const events = json.toSorted((a: Event, b: Event) => a.id - b.id);

	return events;
}

export interface EventsLoaderData {
	data: object[];
}

export async function eventsLoader(): Promise<EventsLoaderData> {
	const data = await readEvents();

	return { data };
}

export default function Events() {
	let { data } = useLoaderData() as EventsLoaderData;
	const [events, dispatch] = useReducer(dataReducer, data);

	function dataReducer(events: Event[], action: any) {
		switch (action.type) {
			case 'created': {
				return [...events, action.event];
			}

			case 'updated': {
				return events;
			}

			case 'deleted': {
				return events;
			}

			default: {
				throw Error('Unknown action: ' + action.type);
			}
		}
	}

	function handleCreate(event: any) {
		dispatch({ type: 'created', event });
	}

	return (
		<>
			<h2>Events</h2>
			<div>
				{events.map(({ id, name, startDate, endDate }: Event) => (
					<EventCard
						id={id}
						name={name}
						startDate={startDate}
						endDate={endDate}
					/>
				))}
			</div>
		</>
	);
}
