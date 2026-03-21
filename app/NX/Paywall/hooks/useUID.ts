"use client";
import { useSelector } from 'react-redux';

export function useUID() {
	const paywall = useSelector((state: any) => state.redux.paywall);
	if (paywall?.authChecked && paywall?.user?.uid) {
		return paywall.user.uid;
	}
	return null;
}
