import {MetaValidator} from "../../MetaValidator.js";
import {isIp} from "../../validators/is-ip.js";
import {IsIpOptions} from "../../interfaces/options/IsIpOptions.js";

export function IsIp(options?: IsIpOptions): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsIp.name,
                message: "$propertyKey must be a valid ip address.",
                method: (input: any) => {
                    return Promise.resolve(isIp(input, options));
                }
            }
        });
    };
}
