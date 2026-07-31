'use client';
import * as React from 'react';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { Icon } from '../../../DesignSystem';
import { useDispatch } from '../../../Uberedux';
import { setUbereduxKey } from '../../../Uberedux';
import { useNXAdmin } from '../../../NXAdmin';
import { requestNotifications } from '../../../NXAdmin';

export default function NotificationBell() {

    const dispatch = useDispatch();
    const nxAdmin = useNXAdmin();
    const notifications = nxAdmin?.notifications || {};
    const { permission, unreadCount = 1, fcmToken } = notifications as {
        permission?: string;
        unreadCount?: number;
        fcmToken?: string;
    };

    // Persistently log the FCM token whenever it is available
    React.useEffect(() => {
        if (fcmToken) {
            console.log("[Persistent] Your FCM Token:", fcmToken);
        }
    }, [fcmToken]);

    const handleClick = React.useCallback(() => {
        if (permission !== 'granted') {
            dispatch(requestNotifications());
            return;
        }
        // Clear unread count and OS badge
        dispatch(setUbereduxKey({ key: 'nxAdmin.notifications.unreadCount', value: 0 }));
        if ('clearAppBadge' in navigator) {
            (navigator as Navigator & { clearAppBadge: () => Promise<void> })
                .clearAppBadge()
                .catch(() => undefined);
        }
    }, [dispatch, permission]);

    const label = permission !== 'granted'
        ? 'Enable notifications'
        : unreadCount > 0
            ? `${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`
            : 'Notifications';

    return (
        <Tooltip title={label}>
            <IconButton
                color="primary"
                onClick={handleClick}
                aria-label={label}
            >
                <Badge
                    badgeContent={unreadCount > 0 ? unreadCount : undefined}
                    color="default"
                    overlap="circular"
                >
                    <Icon icon="notify" />
                </Badge>
            </IconButton>
        </Tooltip>
    );
}
