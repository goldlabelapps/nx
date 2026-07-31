import type { I_MakeRes } from "../../NX/types";
import { makeTime } from './makeTime';
import { getBaseurl } from './getBaseurl';

export function makeRes({ severity, message, data, other }: I_MakeRes) {
    const epoch = Date.now();
    const meta = {
        time: makeTime(epoch),
        baseURL: getBaseurl(),
        severity,
        message,
        
    };
    return data !== undefined
        ? { meta, data, other }
        : { meta };
};
