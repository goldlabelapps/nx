import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import List from '../../../src/components/lists/List/List';
import ListItem from '../../../src/components/lists/ListItem/ListItem';
import ListItemButton from '../../../src/components/lists/ListItemButton/ListItemButton';
import ListItemText from '../../../src/components/lists/ListItemText/ListItemText';
import ListSubheader from '../../../src/components/lists/ListSubheader/ListSubheader';

describe('List primitive', () => {
	it('renders list content with the default ul semantics', () => {
		render(
			<List>
				<ListItem>
					<ListItemText primary="First item" />
				</ListItem>
			</List>
		);

		expect(screen.getByRole('list')).toBeTruthy();
		expect(screen.getByText('First item')).toBeTruthy();
	});

	it('supports the core MUI List props', () => {
		render(
			<List
				component="nav"
				dense
				disablePadding
				subheader={<ListSubheader component="div">Navigation</ListSubheader>}
			>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemText primary="Dashboard" />
					</ListItemButton>
				</ListItem>
			</List>
		);

		const navigation = screen.getByRole('navigation');
		expect(navigation.className).toContain('MuiList-dense');
		expect(navigation.className).not.toContain('MuiList-padding');
		expect(screen.getByText('Navigation')).toBeTruthy();
		expect(screen.getByRole('button', { name: 'Dashboard' })).toBeTruthy();
	});

	it('supports a simple static list item', () => {
		const { container } = render(
			<List>
				<ListItem>
					<ListItemText primary="Dashboard" />
				</ListItem>
			</List>
		);

		expect(container.querySelector('ul')).toBeTruthy();
		expect(within(container).getByText('Dashboard')).toBeTruthy();
	});
});