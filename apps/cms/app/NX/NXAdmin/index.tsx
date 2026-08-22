// Main component
import NXAdmin from './NXAdmin';
import README from './components/README';

// Layout components
import { DesktopLayout, Header, MobileLayout } from './components/Layout';
import PageRouter from './components/PageRouter';

// Page components
import { Queue, FilterSelect } from './components/Queue';
import { Fingerprints } from './components/Fingerprints';
import { Prospects } from './components/Prospects';
import { Tenants } from './components/Tenants';

// UI components
import OptionSelect from './components/UI/OptionSelect';
import InputString from './components/UI/InputString';
import JSONInput from './components/UI/JSONInput';

import SoundPlayer from './components/UI/SoundPlayer';

// Menu components
import NXAdminBtn from './components/Menus/NXAdminBtn';
import CloseAdmin from './components/Menus/CloseAdmin';
import CancelActive from './components/Menus/CancelActive';

import AccountCard from './components/Menus/AccountCard';

import NXAdminMenu from './components/Menus/NXAdminMenu';
import MiniListItem from './components/Menus/MiniListItem';
import PWAAlert from './components/Menus/PWAAlert';
import NotificationBell from './components/Menus/NotificationBell';
import AdminNav from './components/Layout/AdminNav';
import {MegaDash} from './components/MegaDash';

// Actions
import { setNXAdmin } from './actions/setNXAdmin';
import { setCRUD } from './actions/setCRUD';
import { saveNewDoc } from './actions/saveNewDoc';
import { edit } from './actions/edit';
import { initCollection } from './actions/initCollection';
import { collectionDelete } from './actions/collectionDelete';
import { readTypescript } from './actions/readTypescript';
import { subscribeUser } from './actions/subscribeUser';
import { pwaAlert, triggerPwaInstall } from './actions/pwaAlert';
import { requestNotifications } from './actions/requestNotifications';

// Hooks
import { useNXAdmin } from './hooks/useNXAdmin';
import { useCRUD } from './hooks/useCRUD';
import { useCollection } from './hooks/useCollection';
import { useActive } from './hooks/useActive';
import { useNotifications } from './hooks/useNotifications';
import { useHeader } from './hooks/useHeader';

export {
    // Main component
    NXAdmin,
    README,
    MegaDash,

    // Layout components
    DesktopLayout,
    PageRouter,
    Header,
    MobileLayout,
    // Page components
    Queue,
    Fingerprints,
    Fingerprints as FingerprintListItem,
    // Prospects page module
    Prospects,
    Tenants,
    FilterSelect,


    // UI components
    InputString,
    OptionSelect,
    JSONInput,
    SoundPlayer,

    // Menu components
    NXAdminBtn,
    MiniListItem,
    CloseAdmin,
    AccountCard,
    CancelActive,
    NXAdminMenu,
    PWAAlert,
    NotificationBell,
    AdminNav,
    
    // Actions
    setNXAdmin,
    setCRUD,
    saveNewDoc,
    edit,
    initCollection,
    collectionDelete,
    readTypescript,
    subscribeUser,
    pwaAlert,
    triggerPwaInstall,
    requestNotifications,

    // Hooks
    useNXAdmin,
    useCRUD,
    useCollection,
    useActive,
    useNotifications,
    useHeader,
};
