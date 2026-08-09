import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider, Stack } from '@mui/material';
import { AppShell, List, ListItem, ListItemButton, ListItemText, ListSubheader, PageSection } from '../../index';

const meta: Meta<typeof List> = {
	title: 'Lists/List',
	component: List,
	args: {
		dense: false,
		disablePadding: false,
	},
	argTypes: {
		dense: { control: 'boolean' },
		disablePadding: { control: 'boolean' },
		subheader: { control: false },
		children: { control: false },
	},
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
	render: (args) => (
		<AppShell>
			<PageSection title="List" subtitle="A thin wrapper around the MUI List API with the same core behaviors and props.">
				<Stack spacing={3} sx={{ maxWidth: 560 }}>
					<List {...args} subheader={<ListSubheader component="div">Primary actions</ListSubheader>}>
						<ListItem>
							<ListItemText primary="Overview" secondary="Default list item spacing" />
						</ListItem>
						<Divider component="li" />
						<ListItem>
							<ListItemText primary="Settings" secondary="Can be composed with any MUI list items" />
						</ListItem>
					</List>

					<List component="nav" dense disablePadding subheader={<ListSubheader component="div">Compact nav</ListSubheader>}>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText primary="Dashboard" />
							</ListItemButton>
						</ListItem>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemText primary="Reports" />
							</ListItemButton>
						</ListItem>
					</List>
				</Stack>
			</PageSection>
		</AppShell>
	),
};