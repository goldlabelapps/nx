import { I_MakeRes } from "../types";
import { makeTime } from './makeTime';

export function makeRes({ severity, message, data }: I_MakeRes) {
    const epoch = Date.now();
    const meta = {
        severity,
        message,
        time: makeTime(epoch),
        epoch
    };
    return data !== undefined
        ? { meta, data }
        : { meta };
};
