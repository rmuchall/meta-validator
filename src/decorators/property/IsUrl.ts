import {MetaValidator} from "../../MetaValidator";
import {isUrl} from "../../validators/is-url";
import {IsUrlOptions} from "../../interfaces/options/IsUrlOptions";

export function IsUrl(options?: IsUrlOptions): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsUrl.name,
                message: "$propertyKey must be a valid URL.",
                method: (input: any) => {
                    return Promise.resolve(isUrl(input, options));
                }
            }
        });
    };
}
