import {MetaValidator} from "../../MetaValidator.js";
import {isString} from "../../validators/is-string.js";

export function IsString(): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsString.name,
                message: "$propertyKey must be a string.",
                method: (input: any) => {
                    return Promise.resolve(isString(input));
                }
            }
        });
    };
}
