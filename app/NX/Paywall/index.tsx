import SignIn from './components/SignIn';
import AccountCard from './components/AccountCard';
import SimpleSignIn from './components/SimpleSignIn';
import UserSpot from './components/UserSpot';
import Account from './components/Account';
import SignOutBtn from './components/SignOutBtn';
import { setPaywall } from './actions/setPaywall';
import { firebaseLogin, firebaseLogout } from './actions/firebaseAuth';
import { useUID } from './hooks/useUID';
import { useAuthed } from './hooks/useAuthed';
import { usePaywall } from './hooks/usePaywall';
import { useIsAuthed } from './hooks/useIsAuthed';
import { subscribeAccount } from './actions/subscribeAccount';

export {
    Account,
    SignIn,
    SimpleSignIn,
    SignOutBtn,
    setPaywall,
    useAuthed,
    firebaseLogin,
    firebaseLogout,
    usePaywall,
    useIsAuthed,
    subscribeAccount,
    UserSpot,
    useUID,
    AccountCard,
};
