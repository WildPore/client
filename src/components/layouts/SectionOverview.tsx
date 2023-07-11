import Box from '../containers/Box';
import Heading from '../containers/Heading';
import Wrapper from '../containers/Wrapper';

interface SectionOverviewRequirements {
	children?: React.ReactNode;
}

interface SectionOverviewOptions {}

export declare interface SectionOverviewProps
	extends SectionOverviewRequirements,
		SectionOverviewOptions {}

export default function SectionOverview({ children }: SectionOverviewProps) {
	return <>{children}</>;
}
