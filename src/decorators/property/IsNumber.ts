import {MetaValidator} from "../../MetaValidator.js";
import {isNumber} from "../../validators/is-number.js";

export function IsNumber(): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsNumber.name,
                message: "$propertyKey must be a number.",
                method: (input: any) => {
                    return Promise.resolve(isNumber(input));
                }
            }
        });
    };
}
