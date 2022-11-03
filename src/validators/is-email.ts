import {isString} from "./is-string.js";

export function isEmail(input: unknown): boolean {
    if (!isString(input)) {
        return false;
    }

    return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>().,;\s@"]+\.?)+[^<>().,;:\s@"]{2,})$/.test(input);
}
