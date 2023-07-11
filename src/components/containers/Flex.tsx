import style from './Flex.module.css';

interface FlexRequirements {
	direction: 'row' | 'column';
	children?: React.ReactNode;
}

interface FlexOptions {
	styles?: string[];
}

export declare interface FlexProps extends FlexRequirements, FlexOptions {}

export default function Flex({
	direction = 'row',
	styles = [],
	children,
}: FlexProps) {
	const directionStyle = style[direction === 'row' ? 'row' : 'column'];

	return (
		<div className={[style.flex, directionStyle, ...styles].join(' ')}>
			{children}
		</div>
	);
}
