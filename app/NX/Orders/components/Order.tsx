'use client';
import * as React from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Card,
    CardHeader,
    Typography,
    ButtonBase,
    CardMedia,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Button,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useDispatch } from '../../../NX/Uberedux';
import { Icon } from '../../DesignSystem';
import { Product, Thumbnail } from '../../Orders';
import he from 'he';


interface I_Order {
    data: any; // Replace 'any' with a specific type if available
}

const Order: FC<I_Order> = ({ data }) => {

    const dispatch = useDispatch();

    const {
        name,
        categories,
        attribute_set_code,
        thumbnail_image,
    } = data || {};
    // React.useEffect(() => {
    //     if (!initted) {
    //         dispatch(init());
    //     }
    // }, [initted, dispatch]);

    const src = `/shared/jpg/magento/${thumbnail_image}`;
    const decodedName = name ? he.decode(name) : '';

    const thumbSize = 75;
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <>
            <ButtonBase
                sx={{width: '100%', textAlign: 'left', my: 0.5 }}
                onClick={() => setOpen(true)}
            >
                <Card 
                    variant="outlined"
                    sx={{ width: '100%', backgroundColor: theme.palette.background.default, borderColor: theme.palette.divider }}
                >
                    <CardHeader 
                        // avatar={<Icon icon="orders" color="primary"/>}
                        title={decodedName}
                        subheader={attribute_set_code}
                        action={<Thumbnail src={src} alt={decodedName} size={50}/>} 
                    />
                </Card>
            </ButtonBase>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth fullScreen={isMobile}>
                <DialogContent>
                    <Product data={data} />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        color="primary">
                        Close
                    </Button>
                    
                    <Button
                        onClick={() => setOpen(false)}
                        color="primary"
                        startIcon={<Icon icon="heart" />}
                        variant="outlined">
                        WishList
                    </Button>
                    
                    <Button
                        onClick={() => setOpen(false)}
                        color="primary"
                        startIcon={<Icon icon="orders" />}
                        variant="contained">
                        Buy
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    );
};

export default Order;

