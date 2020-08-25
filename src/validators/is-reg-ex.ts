import {isString} from "./is-string";
import {isEmpty} from "./is-empty";

export function isRegEx(input: any): boolean {
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
