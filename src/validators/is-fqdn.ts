import {IsFqdnOptions} from "../interfaces/options/IsFqdnOptions";
import {isString} from "./is-string";
import {isEmpty} from "./is-empty";

// From ValidatorJs
// https://github.com/validatorjs/validator.js
export function isFqdn(input: any, options?: IsFqdnOptions): boolean {
    if (!options) {
        options = {
            allowTrailingDot: false,
            allowUnderscores: false,
            requireTld: true
        };
    }

    if (isEmpty(input)) {
        return false;
    }
    
    if (!isString(input)) {
        return false;
    }

    // Remove the optional trailing dot before checking validity
    if (options?.allowTrailingDot && input[input.length - 1] === ".") {
        input = input.substring(0, input.length - 1);
    }

    // Split on .
    const parts = input.split(".");

    // Check length
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].length > 63) {
            return false;
        }
    }

    if (options?.requireTld) {
        const tld = parts.pop();
        if (tld) {
            if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
                return false;
            }

            // Forbid spaces && special characers
            // Erroneous eslint error (using unicode flag /u breaks IE11)
            // eslint-disable-next-line no-misleading-character-class
            if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20\u00A9\uFFFD]/.test(tld)) {
                return false;
            }
        }
    }

    // Iterate over parts
    for (let part, i = 0; i < parts.length; i++) {
        part = parts[i];

        if (options.allowUnderscores) {
            part = part.replace(/_/g, '');
        }

        if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
            return false;
        }

        // Forbid full-width chars
        if (/[\uff01-\uff5e]/.test(part)) {
            return false;
        }

        if (part[0] === "-" || part[part.length - 1] === "-") {
            return false;
        }
    }

    return true;
}
