import NXAdmin from './NXAdmin';
import { CreateDoc, ReadDoc, UpdateDoc, DeleteDoc } from './components/CRUD';
import { Share } from './components/Share';
import { Collection } from './components/Collection';
import { TypeScript } from './components/TypeScript';
import NXAdminBtn from './components/NXAdminBtn';
import CloseAdmin from './components/CloseAdmin';
import NXAdminMenu from './components/NXAdminMenu';
import { setNXAdmin } from './actions/setNXAdmin';
import { setCRUD } from './actions/setCRUD';
import { initCollection } from './actions/initCollection';
import { useNXAdmin } from './hooks/useNXAdmin';
import { useCRUD } from './hooks/useCRUD';

export {
    NXAdmin,
    NXAdminBtn,
    CloseAdmin,
    NXAdminMenu,
    CreateDoc,
    ReadDoc,
    UpdateDoc,
    DeleteDoc,
    Share,
    Collection,
    TypeScript,
    setNXAdmin,
    setCRUD,
    initCollection,
    useCRUD,
    useNXAdmin,
};
