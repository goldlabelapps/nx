
'use client';
import * as React from 'react';
import {
    Box,
    Button,
    IconButton,
    Typography,
    Collapse,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { useFilters, useNumbers } from '../';
import { Icon } from '../../../../DesignSystem';
import { useDispatch } from '../../../../Uberedux';

export default function FilterSelect() {
    const wip = false;
    const dispatch = useDispatch();
    const filtersRaw = useFilters();
    const filters = filtersRaw || {};
    const numbers = useNumbers();
    const [open, setOpen] = React.useState(false);
    const [advancedOpen, setAdvancedOpen] = React.useState(false);
    const [localFilters, setLocalFilters] = React.useState({
        factor: '',
        collection: 'any',
        group: 'any',
    });
    const [filteredCount, setFilteredCount] = React.useState(numbers.filtered);

    let humanReadableText = '';
    const collectionSet = !!filters.collection;
    const groupSet = !!filters.group;
    if (!collectionSet && !groupSet) {
        humanReadableText = 'Apply filters?';
    } else {
        humanReadableText = [
            `Collection filter is: ${collectionSet ? filters.collection : 'not set'}.`,
            `Group filter is: ${groupSet ? filters.group : 'not set'}.`
        ].join(' ');
    }
    const handleToggle = () => {
        setOpen((prev) => {
            const next = !prev;
            if (!next) setAdvancedOpen(false);
            return next;
        });
    };
    // Show advanced filter when Yes is clicked
    const handleShowAdvanced = () => {
        setOpen(false);
        setAdvancedOpen(true);
    };

    // Close all
    const handleAllDone = () => {
        setOpen(false);
        setAdvancedOpen(false);
    };
    // Simulate filtering logic for demo
    const handleApplyAdvanced = () => {
        setAdvancedOpen(false);
        if (localFilters.factor) {
            setFilteredCount(Math.max(0, numbers.filtered - 1));
        } else {
            setFilteredCount(numbers.filtered);
        }
    };

    if (wip) return null;
    
    return (
        <>
            <Box sx={{textAlign: 'center' }}>
                {/* <IconButton onClick={handleToggle}>
                    <Icon icon="prospects"  />
                </IconButton> */}
                {numbers.total !== 0 && (
                    <Typography variant="h4" sx={{ml:1}}>
                        {numbers.total} to go
                    </Typography>
                )}
                <Collapse in={open}>
                    <Typography variant="caption">
                        {humanReadableText}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<Icon icon="close" />}
                            onClick={() => setOpen(false)}
                        >
                            No
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<Icon icon="right" />}
                            onClick={handleShowAdvanced}
                        >
                            Yes
                        </Button>
                    </Box>
                </Collapse>
                <Collapse in={advancedOpen} sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        Each record includes two key fields: <b>group</b> and <b>collection</b>.<br />
                        These fields help organise and filter the queue, making it easier to manage large sets of data by segmenting them into meaningful categories.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, my: 2}}>
                        <FormControl sx={{ minWidth: 225 }}>
                            <InputLabel id="collection-select-label">
                                Collection
                            </InputLabel>
                            <Select
                                labelId="collection-select-label"
                                variant='filled'
                                value={localFilters.collection}
                                onChange={e => setLocalFilters({ ...localFilters, collection: e.target.value })}
                            >
                                <MenuItem value="any">
                                    Any
                                </MenuItem>
                                {(filters.collections || []).map((col: string) => (
                                    <MenuItem key={col} value={col}>{col}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 225 }}>
                            <InputLabel id="group-select-label">
                            Group
                            </InputLabel>
                            <Select
                                variant='filled'
                                labelId="group-select-label"
                                value={localFilters.group}
                                onChange={e => setLocalFilters({ ...localFilters, group: e.target.value })}
                            >
                                <MenuItem value="any">Any</MenuItem>
                                {(filters.groups || []).map((grp: string) => (
                                    <MenuItem key={grp} value={grp}>{grp}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<Icon icon="close" />}
                            onClick={handleAllDone}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            endIcon={<Icon icon="tick" />}
                            onClick={handleAllDone}
                        >
                            Apply
                        </Button>
                    </Box>
                </Collapse>
            </Box>
            {/* <pre>numbers {JSON.stringify(numbers, null, 2)}</pre> */}
        </>
    );
}
