import {MetaValidator} from "../../MetaValidator";
import {isIp} from "../../validators/is-ip";
import {IsIpOptions} from "../../interfaces/options/IsIpOptions";

export function IsIp(options?: IsIpOptions): Function {
    return function (target: Object, propertyKey: string | symbol): void {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                message: `${propertyKey.toString()} must be a valid ip address.`,
                method: async (input: any) => {
                    return isIp(input, options);
                }
            }
        });
    };
}
