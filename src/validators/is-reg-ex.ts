import {isString} from "./is-string.js";
import {isEmpty} from "./is-empty.js";

export function isRegEx(input: unknown): boolean {
    if (isEmpty(input)) {
        return false;
    }

    if (!isString(input)) {
        return false;
    }

    try {
        new RegExp(input);
    } catch (error) {
        return false;
    }

    return true;
}
