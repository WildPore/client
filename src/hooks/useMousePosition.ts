import { useEffect, useState } from 'react';

type Coord2D = { x: number | null; y: number | null };

export function useMousePosition(): Coord2D {
	// Stolen from Josh W. Comeau
	// https://www.joshwcomeau.com/snippets/react-hooks/use-mouse-position/

	const [mousePosition, setMousePosition] = useState({ x: null, y: null });

	useEffect(() => {
		function updateMousePosition(event: any) {
			setMousePosition({ x: event.clientX, y: event.clientY });
		}

		window.addEventListener('mousemove', updateMousePosition);

		return () => {
			window.removeEventListener('mousemove', updateMousePosition);
		};
	}, []);

	return mousePosition;
}
