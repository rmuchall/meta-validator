import {MetaValidator} from "../../MetaValidator.js";
import {isString} from "../../validators/is-string.js";

export function IsMaxLength(maxLength: number): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsMaxLength.name,
                message: "$propertyKey must be less than $option0 characters.",
                options: [maxLength],
                method: (input: any) => {
                    return Promise.resolve(isString(input) && input.length <= maxLength);
                }
            }
        });
    };
}
