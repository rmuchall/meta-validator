import {isIp4, isIp6} from "./is-ip.js";
import {isFqdn} from "./is-fqdn.js";
import {IsUrlOptions} from "../interfaces/options/IsUrlOptions.js";
import {isString} from "./is-string.js";

export function isUrl(input: unknown, options?: IsUrlOptions): boolean {
    // Set default options?
    if (!options) {
        // https://url.spec.whatwg.org/#special-scheme
        options = {
            validProtocols: ["ftp", "file", "http", "https", "ws", "wss"]
        };
    }

    // Check for input
    if (!input) {
        return false;
    }

    // Check input type
    if (!isString(input)) {
        return false;
    }

    // Check for forbidden characters
    if (/[\t\n]/.test(input)) {
        return false;
    }

    // Check for possible XSS tags
    if (/[\s<>]/.test(input)) {
        return false;
    }

    // Check for duplicate forward slashes
    if (/([^:]\/)\/+/g.test(input)) {
        return false;
    }

    // Check length
    // https://stackoverflow.com/a/417184
    if (input.length > 2083) {
        return false;
    }

    // Convert input to exploded URL
    let url: URL;
    try {
        url = new URL(input);
    } catch (error) {
        return false;
    }

    // Check valid protocols
    const protocol: string = url.protocol.substring(0, url.protocol.length - 1); // Trim trailing colon
    if (!options.validProtocols.includes(protocol.toLowerCase())) {
        return false;
    }

    // Check valid ports
    if (url.port) {
        if (!/^[0-9]+$/.test(url.port)) {
            return false;
        }

        if (Number(url.port) <= 0 || Number(url.port) > 65535) {
            return false;
        }
    }

    // Check input is an fqdn, ipv4 or wrapped ipv6
    if (!isFqdn(url.hostname)) {
        if (!isIp6(url.hostname.substring(1, url.hostname.length - 1))) {
            if (!isIp4(url.hostname)) {
                return false;
            }
        }
    }

    return true;
}
