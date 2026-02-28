import { I_MakeRes } from "../types";
import { makeTime, getBaseurl } from '../';

export function makeRes({ severity, message, data }: I_MakeRes) {
    const epoch = Date.now();
    const meta = {
        baseURL: getBaseurl(),
        severity,
        message,
        time: makeTime(epoch),
    };
    return data !== undefined
        ? { meta, data }
        : { meta };
};
