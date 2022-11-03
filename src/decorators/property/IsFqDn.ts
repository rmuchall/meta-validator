import {MetaValidator} from "../../MetaValidator.js";
import {isFqdn} from "../../validators/is-fqdn.js";
import {IsFqdnOptions} from "../../interfaces/options/IsFqdnOptions.js";

export function IsFqDn(options?: IsFqdnOptions): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsFqDn.name,
                message: "$propertyKey must be a fully qualified domain name.",
                method: (input: any) => {
                    return Promise.resolve(isFqdn(input, options));
                }
            }
        });
    };
}
