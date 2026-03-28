import { firebaseLogin, firebaseLogout } from './actions/firebaseAuth';
// Components
import SignIn from './components/SignIn';
import AccountCard from './components/AccountCard';
import SimpleSignIn from './components/SimpleSignIn';
import Register from './components/Register';
import ChooseAvatar from './components/ChooseAvatar';
import UserSpot from './components/UserSpot';
import Account from './components/Account';
import SignOutBtn from './components/SignOutBtn';
// Actions
import { setPaywall } from './actions/setPaywall';
import { avatarByUID } from './actions/avatarByUID';
import { subscribeAccount } from './actions/subscribeAccount';
import { updateAccount } from './actions/updateAccount';

// Hooks
import { useUID } from './hooks/useUID';
import { useAuthed } from './hooks/useAuthed';
import { usePaywall } from './hooks/usePaywall';
import { useAccount } from './hooks/useAccount';
import { useIsAuthed } from './hooks/useIsAuthed';


// Components
export {
    Account,
    SignIn,
    SimpleSignIn,
    SignOutBtn,
    AccountCard,
    Register,
    ChooseAvatar,
    UserSpot,
};

// Actions
export {
    setPaywall,
    avatarByUID,
    subscribeAccount,
    updateAccount,
    firebaseLogin,
    firebaseLogout,
};

// Hooks
export {
    useUID,
    useAuthed,
    usePaywall,
    useAccount,
    useIsAuthed,
};
