import {isString} from "./is-string";

export function isAlphanumeric(input: any): boolean {
    if (!isString(input)) {
        return false;
    }

    return /^([0-9]|[a-z])+([0-9a-z]+)$/i.test(input);
}
