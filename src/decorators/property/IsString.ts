import {MetaValidator} from "../../MetaValidator";
import {isString} from "../../validators/is-string";

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
                message: `${propertyKey.toString()} must only contain letters.`,
                method: (input: any) => {
                    return Promise.resolve(isString(input));
                }
            }
        });
    };
}
