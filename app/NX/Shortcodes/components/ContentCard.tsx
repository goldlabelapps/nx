'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Typography,
    Paper,
    ButtonBase,
} from '@mui/material';
import { 
    Icon, 
    navigateTo,
    fetchMarkdown,
} from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export default function ContentCard({
    slug = '/',
}: {
    slug: string;
}) {
    const dispatch = useDispatch();
    const router = useRouter();

    React.useEffect(() => {
        dispatch(fetchMarkdown(slug));
    }, [slug, dispatch]);

    const handleClick = () => {        
        dispatch(navigateTo(router, slug));
    };

    return (<>
                <ButtonBase
                    onClick={handleClick}
                    sx={{
                        textAlign: 'left',
                        width: '100%',
                    }}
                >
                    <Paper variant="outlined" sx={{ p: 2, width: '100%', display: 'flex' }}>
                        <Icon icon="link" color="primary" />
                        <Typography variant="h6" sx={{ ml: 2 }}>
                            ContentCard {slug}
                        </Typography>
                    </Paper>
                </ButtonBase>
                {/* <pre>slug: {JSON.stringify(slug, null, 2)}</pre> */}
            </>
    );
}
