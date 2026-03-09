import NXAdmin from './NXAdmin';
import { CreateDoc, ReadDoc, UpdateDoc, DeleteDoc } from './components/CRUD';
import { Collection } from './components/Collection';
import { TypeScript } from './components/TypeScript';
import NXAdminBtn from './components/Menus/NXAdminBtn';
import CloseAdmin from './components/Menus/CloseAdmin';
import NXAdminMenu from './components/Menus/NXAdminMenu';
import { setNXAdmin } from './actions/setNXAdmin';
import { setCRUD } from './actions/setCRUD';
import { readTypescript } from './actions/readTypescript';
import { initCollection } from './actions/initCollection';
import { useNXAdmin } from './hooks/useNXAdmin';
import { useCRUD } from './hooks/useCRUD';
import { useCollection } from './hooks/useCollection';
import { useActive } from './hooks/useActive';

export {
    NXAdmin,
    NXAdminBtn,
    CloseAdmin,
    NXAdminMenu,
    CreateDoc,
    ReadDoc,
    UpdateDoc,
    DeleteDoc,
    Collection,
    TypeScript,
    setNXAdmin,
    setCRUD,
    readTypescript,
    initCollection,
    useCRUD,
    useNXAdmin,
    useCollection,
    useActive,
};
