import {MetaValidator} from "../../MetaValidator";
import {isFqdn} from "../../validators/is-fqdn";
import {IsFqdnOptions} from "../../interfaces/options/IsFqdnOptions";

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
