import type { I_MakeRes } from "../../NX/types";
import { makeTime } from './makeTime';

export function makeRes({ severity, message, data }: I_MakeRes) {
    return {
        time: makeTime(Date.now()),
        tenant: process.env.NEXT_PUBLIC_TENANT || '',
        severity,
        message,
        data
    };
};
