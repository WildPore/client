import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './Sidebar.module.css';

import { Link } from 'react-router-dom';

import Column from '../containers/Column';
import Row from '../containers/Row';

export default function Sidebar() {
	return (
		<section className={styles.container}>
			<Column>
				<Logo />
				<SearchBar />
				<Nav />
			</Column>
		</section>
	);
}

function Logo() {
	return (
		<>
			<Link to='/' className={styles.logo}>
				<h2>Positive Systems</h2>
			</Link>
		</>
	);
}

function SearchBar() {
	return (
		<>
			<label htmlFor='search' className='visuallyHidden'>
				Search
			</label>
			<input type='text' name='search' id='search' />
		</>
	);
}

function Nav() {
	return (
		<nav className={styles.nav}>
			<ul>
				<NavItem to='/orders'>Orders</NavItem>
				<NavItem to='/inventory'>Inventory</NavItem>
				<NavItem to='/events'>Events</NavItem>
				<NavItem to='/details'>Details</NavItem>
				<NavDropdown label='Dropdown Item'>
					<NavItem to='/'>Example #1</NavItem>
					<NavItem to='/'>Example #2</NavItem>
					<NavItem to='/'>Example #3</NavItem>
					<NavItem to='/'>Example #1</NavItem>
					<NavItem to='/'>Example #2</NavItem>
					<NavItem to='/'>Example #3</NavItem>
					<NavItem to='/'>Example #1</NavItem>
					<NavItem to='/'>Example #2</NavItem>
					<NavItem to='/'>Example #3</NavItem>
					<NavItem to='/'>Example #1</NavItem>
					<NavItem to='/'>Example #2</NavItem>
					<NavItem to='/'>Example #3</NavItem>
					<NavItem to='/'>Example #1</NavItem>
					<NavItem to='/'>Example #2</NavItem>
					<NavItem to='/'>Example #3</NavItem>
					<NavItem to='/'>Example #1</NavItem>
					<NavItem to='/'>Example #2</NavItem>
					<NavItem to='/'>Example #3</NavItem>
					<NavItem to='/'>Example #1</NavItem>
					<NavItem to='/'>Example #2</NavItem>
					<NavItem to='/'>Example #3</NavItem>
				</NavDropdown>
			</ul>
		</nav>
	);
}

interface NavItemProps {
	to: string;
	children: React.ReactNode;
}

function NavItem({ to, children }: NavItemProps) {
	return (
		<>
			<li className={styles.navItem}>
				<Link to={to}>
					<button type='button'>{children}</button>
				</Link>
			</li>
		</>
	);
}

interface NavDropdownProps {
	label: string;
	children: React.ReactNode;
}

function NavDropdown({ label, children }: NavDropdownProps) {
	const [open, setOpen] = useState(false);
	const [pinOpen, setPinOpen] = useState(false);

	function handleMouseEnter() {
		if (pinOpen) {
			return;
		}

		setOpen(true);
	}

	function handleMouseLeave() {
		if (pinOpen) {
			return;
		}

		setOpen(false);
	}

	function handleClick() {
		setOpen(pinOpen || !open);
	}

	function handlePin() {
		setPinOpen(!pinOpen);
	}

	return (
		<>
			<li
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={styles.navItem}
			>
				<Column>
					<Row styles={[styles.gap]}>
						<button type='button' onClick={handleClick}>
							{label}
						</button>
						<button type='button' onClick={handlePin}>
							{pinOpen ? 'Unpin' : 'Pin'}
						</button>
					</Row>
					{open && (
						<ul onClick={handleClick} className={styles.navDropdown}>
							{children}
						</ul>
					)}
				</Column>
			</li>
		</>
	);
}
