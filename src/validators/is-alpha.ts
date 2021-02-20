import {isString} from "./is-string";

export function isAlpha(input: unknown): boolean {
    if (!isString(input)) {
        return false;
    }

    return /^[A-Z]+$/i.test(input);
}
