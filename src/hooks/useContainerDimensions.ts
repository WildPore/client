import { Ref, useEffect, useState } from 'react';

// https://stackoverflow.com/a/60978633

export function useContainerDimensions(
	containerRef: React.RefObject<HTMLElement>
) {
	const [dimensions, setDimensions] = useState({
		width: null,
		height: null,
	} as { width: number | null; height: number | null });

	useEffect(() => {
		function getDimensions() {
			return {
				width: containerRef.current?.offsetWidth || null,
				height: containerRef.current?.offsetHeight || null,
			};
		}

		function handleResize() {
			setDimensions(getDimensions());
		}

		if (containerRef.current) {
			setDimensions(getDimensions());
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [containerRef]);

	return dimensions;
}
