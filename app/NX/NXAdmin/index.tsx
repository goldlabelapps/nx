import NXAdmin from './NXAdmin';
import { MiniDrawer, SwipeDrawer, MaxiDrawer } from './components/Layout';
import Dashboard from './components/Dashboard';
import { CreateDoc, ReadDoc, UpdateDoc, DeleteDoc } from './components/CRUD';
import { Collection } from './components/Collection';
import { Account } from './components/Account';
import { TypeScript } from './components/TypeScript';
import NXAdminBtn from './components/Menus/NXAdminBtn';
import CloseAdmin from './components/Menus/CloseAdmin';
import CancelActive from './components/Menus/CancelActive';
import NXAdminMenu from './components/Menus/NXAdminMenu';
import { setNXAdmin } from './actions/setNXAdmin';
import { collectionDelete } from './actions/collectionDelete';
import { setCRUD } from './actions/setCRUD';
import { saveNewDoc} from './actions/saveNewDoc';
import { readTypescript } from './actions/readTypescript';
import { initCollection } from './actions/initCollection';
import { edit } from './actions/edit';
import { useNXAdmin } from './hooks/useNXAdmin';
import { useCRUD } from './hooks/useCRUD';
import { useCollection } from './hooks/useCollection';
import { useActive } from './hooks/useActive';
import MiniListItem from './components/Menus/MiniListItem';
import OptionSelect from './components/UI/OptionSelect';
import InputString from './components/UI/InputString';
import JSONInput from './components/UI/JSONInput';

export {
    NXAdmin,
    MaxiDrawer,
    SwipeDrawer,
    InputString,
    OptionSelect,
    MiniDrawer,
    Dashboard,
    NXAdminBtn,
    MiniListItem,
    CloseAdmin,
    CancelActive,
    NXAdminMenu,
    CreateDoc,
    ReadDoc,
    UpdateDoc,
    DeleteDoc,
    Collection,
    TypeScript,
    setNXAdmin,
    setCRUD,
    saveNewDoc,
    readTypescript,
    initCollection,
    edit,
    useCRUD,
    useNXAdmin,
    useCollection,
    useActive,
    JSONInput,
    collectionDelete,
    Account,
};
