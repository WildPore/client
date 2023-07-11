import { useReducer } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

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
				return [];
			}

			case 'updated': {
				return [];
			}

			case 'deleted': {
				return [];
			}

			default: {
				throw Error('Unknown action: ' + action.type);
			}
		}
	}

	return (
		<>
			<h2>Events</h2>
			<div>
				{events.map(({ id, name, startDate, endDate }: Event) => (
					<Event id={id} name={name} startDate={startDate} endDate={endDate} />
				))}
			</div>
		</>
	);
}

// TODO: Create event stub item
// Takes event data item, can we create the link to the route independently or does that have to be drilled to this component?
function Event({ id, name, startDate, endDate }: Event) {
	return (
		<div>
			<Link to={`/events/${id}`}>
				[{id}]: {name}
			</Link>
			<p>Starts on {startDate.toString()}</p>
			<p>Ends by {endDate.toString()}</p>
		</div>
	);
}
