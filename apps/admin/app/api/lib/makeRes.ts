import type { I_MakeRes } from "../../NX/types";
import { makeTime } from './makeTime';

export function makeRes({ severity, message, data }: I_MakeRes) {
    return {
        time: makeTime(Date.now()),
        severity,
        message,
        data
    };
};
