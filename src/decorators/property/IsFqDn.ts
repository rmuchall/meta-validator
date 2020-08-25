import {MetaValidator} from "../../MetaValidator";
import {isFqdn} from "../../validators/is-fqdn";
import {IsFqdnOptions} from "../../interfaces/options/IsFqdnOptions";

export function IsFqDn(options?: IsFqdnOptions): Function {
    return function (target: Object, propertyKey: string | symbol): void {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                message: `${propertyKey.toString()} must be a fully qualified domain name.`,
                method: async (input: any) => {
                    return isFqdn(input, options);
                }
            }
        });
    };
}
