import { I_MakeRes } from "../types";

export function makeRes({ severity, message, data }: I_MakeRes) {
    return {
        severity,
        message,
        ...(data !== undefined ? { data } : {})
    };
}