'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Typography,
    Paper,
    ButtonBase,
    CardHeader,
} from '@mui/material';
import { 
    Icon, 
    navigateTo,
    fetchMarkdown,
    useMarkdown,
} from '../../DesignSystem';
import { useDispatch } from '../../Uberedux';

export default function ContentCard({
    slug = '/',
}: {
    slug: string;
}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const content = useMarkdown(slug);
    const markdown = content && content.data ? content.data.data : null;

    React.useEffect(() => {
        dispatch(fetchMarkdown(slug));
    }, [slug, dispatch]);

    const handleClick = () => {        
        dispatch(navigateTo(router, slug));
    };

    if (!markdown) return null;

    const title = markdown.frontmatter.title || 'Untitled';
    const icon = markdown.frontmatter.icon || 'star';
    const description = markdown.frontmatter.description || 'No description available';

    return (<>
                <ButtonBase
                    onClick={handleClick}
                    sx={{
                        textAlign: 'left',
                        width: '100%',
                    }}
                >
                    <CardHeader 
                        sx={{ width: '100%' }}
                        title={title}
                        subheader={description}
                        avatar={<Icon icon={icon} color="primary" />}
                    />
                    {/* <Paper variant="outlined" sx={{ p: 2, width: '100%', display: 'flex' }}>
                        <Icon icon={icon} color="primary" />
                        <Typography variant="h6" sx={{ ml: 2 }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 2 }}>
                            {description}
                        </Typography>
                    </Paper> */}
                </ButtonBase>

                {/* <pre>markdown: {JSON.stringify(markdown, null, 2)}</pre> */}
            </>
    );
}
