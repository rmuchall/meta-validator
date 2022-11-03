import {isString} from "./is-string.js";

export function isAlphanumeric(input: unknown): boolean {
    if (!isString(input)) {
        return false;
    }

    return /^([0-9]|[a-z])+([0-9a-z]+)$/i.test(input);
}
