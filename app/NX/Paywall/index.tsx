
import Paywall from "./Paywall";
import SignIn from './components/SignIn';
import UserSpot from './components/UserSpot';
import Account from './components/Account';
import SignOutBtn from './components/SignOutBtn';
import { setPaywall } from './actions/setPaywall';
import { firebaseLogin, firebaseLogout } from './actions/firebaseAuth';
import { useAuthed } from './hooks/useAuthed';
import { usePaywall } from './hooks/usePaywall';
import { useIsAuthed } from './hooks/useIsAuthed';
import { subscribeUser } from './actions/subscribeUser';

export {
    Paywall,
    Account,
    SignIn,
    SignOutBtn,
    setPaywall,
    useAuthed,
    firebaseLogin,
    firebaseLogout,
    usePaywall,
    useIsAuthed,
    subscribeUser,
    UserSpot,
};
