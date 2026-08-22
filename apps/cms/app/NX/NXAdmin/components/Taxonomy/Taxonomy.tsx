'use client';
import * as React from 'react';
import {
    Box,
    Button,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import { setNXAdmin } from '../../../NXAdmin';
import { useDispatch } from '@nx/uberedux';
import { Icon } from '../../../DesignSystem';
import { useTerms } from './hooks/useTerms';
import { saveTerm } from './actions/saveTerm';
import { deleteTerm } from './actions/deleteTerm';
import type { T_TaxonomyCollection } from './types';

function TermList({ taxonomy, label }: { taxonomy: T_TaxonomyCollection; label: string }) {
    const dispatch = useDispatch();
    const { terms, loading } = useTerms<{ id: string; name: string }>(taxonomy);
    const [newName, setNewName] = React.useState('');

    const handleCreate = async () => {
        if (!newName.trim()) return;
        await dispatch(saveTerm(taxonomy, { name: newName.trim() }));
        setNewName('');
    };

    return (
        <Box sx={{ flex: 1, minWidth: 280 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>{label}</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                    size="small"
                    fullWidth
                    placeholder={`New ${label.toLowerCase().slice(0, -1)}`}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                />
                <Button variant="contained" onClick={handleCreate} startIcon={<Icon icon="plus" />}>
                    Add
                </Button>
            </Box>

            {loading ? (
                <Typography variant="body2">Loading...</Typography>
            ) : terms.length === 0 ? (
                <Typography variant="body2">No {label.toLowerCase()} yet.</Typography>
            ) : (
                <List disablePadding>
                    {terms.map((term) => (
                        <ListItem
                            key={term.id}
                            divider
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    color="error"
                                    onClick={() => dispatch(deleteTerm(taxonomy, term.id))}
                                    aria-label="Delete"
                                >
                                    <Icon icon="delete" />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={term.name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
}

export default function Taxonomy() {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setNXAdmin('header', {
            title: 'Categories & Tags',
            icon: 'category',
        }));
    }, [dispatch]);

    return (
        <Box sx={{ p: 2 }}>
            <Grid container spacing={4}>
                <TermList taxonomy="categories" label="Categories" />
                <TermList taxonomy="tags" label="Tags" />
            </Grid>
        </Box>
    );
}
