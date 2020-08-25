import {MetaValidator} from "../../MetaValidator";
import {isUrl} from "../../validators/is-url";
import {IsUrlOptions} from "../../interfaces/options/IsUrlOptions";

export function IsUrl(options?: IsUrlOptions): Function {
    return function (target: Object, propertyKey: string | symbol): void {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                message: `${propertyKey.toString()} must be a valid URL.`,
                method: async (input: any) => {
                    return isUrl(input, options);
                }
            }
        });
    };
}
