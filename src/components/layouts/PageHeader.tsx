import styles from './PageHeader.module.css';

import { Link } from 'react-router-dom';
import Heading from '../containers/Heading';
import Row from '../containers/Row';

export default function PageHeader() {
	return (
		<>
			<Heading>Positive Systems</Heading>
			<Nav>
				<Row>
					<NavItem to='/'>Home</NavItem>
					<NavItem to='/orders'>Orders</NavItem>
					<NavItem to='/fake'>Fake</NavItem>
				</Row>
			</Nav>
		</>
	);
}

interface NavProps {
	children: React.ReactNode;
}

function Nav({ children }: NavProps) {
	return (
		<nav className={styles.nav}>
			<Row>
				<ul>{children}</ul>
			</Row>
		</nav>
	);
}

interface NavItemProps {
	to: string;
	children: React.ReactNode;
}

function NavItem({ to, children }: NavItemProps) {
	return (
		<li className={styles.navItem}>
			<Link to={to}>
				<button type='button'>{children}</button>
			</Link>
		</li>
	);
}

function NavDropdown() {
	return <li className={styles.navDropdown}></li>;
}
