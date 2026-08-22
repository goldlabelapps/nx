"use client";
import { useSelector } from 'react-redux';

export function useIsAuthed() {
	const paywall = useSelector((state: any) => state.redux.paywall);
	// User is authed if paywall.user is not null and authChecked is true
	return !!paywall?.user && paywall?.authChecked === true;
}
