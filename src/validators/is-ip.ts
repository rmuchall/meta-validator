// From NodeJs runtime
// https://github.com/nodejs/node/blob/master/lib/internal/net.js

// IPv4 Segment
import {isString} from "./is-string";
import {IsIpOptions} from "../interfaces/options/IsIpOptions";

const v4Seg = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])";
const v4Str = `(${v4Seg}[.]){3}${v4Seg}`;
const v4RegExp = new RegExp(`^${v4Str}$`);

// IPv6 Segment
const v6Seg = "(?:[0-9a-fA-F]{1,4})";
const v6RegExp = new RegExp("^(" +
    `(?:${v6Seg}:){7}(?:${v6Seg}|:)|` +
    `(?:${v6Seg}:){6}(?:${v4Str}|:${v6Seg}|:)|` +
    `(?:${v6Seg}:){5}(?::${v4Str}|(:${v6Seg}){1,2}|:)|` +
    `(?:${v6Seg}:){4}(?:(:${v6Seg}){0,1}:${v4Str}|(:${v6Seg}){1,3}|:)|` +
    `(?:${v6Seg}:){3}(?:(:${v6Seg}){0,2}:${v4Str}|(:${v6Seg}){1,4}|:)|` +
    `(?:${v6Seg}:){2}(?:(:${v6Seg}){0,3}:${v4Str}|(:${v6Seg}){1,5}|:)|` +
    `(?:${v6Seg}:){1}(?:(:${v6Seg}){0,4}:${v4Str}|(:${v6Seg}){1,6}|:)|` +
    `(?::((?::${v6Seg}){0,5}:${v4Str}|(?::${v6Seg}){1,7}|:))` +
    ")(%[0-9a-zA-Z]{1,})?$");

export function isIp4(input: any): boolean {
    if (!isString(input)) {
        return false;
    }

    return v4RegExp.test(input);
}

export function isIp6(input: any): boolean {
    if (!isString(input)) {
        return false;
    }

    return v6RegExp.test(input);
}

export function isIp(input: any, options?: IsIpOptions): boolean {
    if (!isString(input)) {
        return false;
    }

    if (options) {
        if (options.version === 4) {
            return isIp4(input);
        }

        if (options.version === 6) {
            return isIp6(input);
        }

        throw new Error("Invalid options");
    }

    return isIp4(input) || isIp6(input);
}
