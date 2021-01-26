import {MetaValidator} from "../../MetaValidator";
import {isString} from "../../validators/is-string";

export function IsMaxLength(maxLength: number): Function {
    return (target: Object, propertyKey: string | symbol): void => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsMaxLength.name,
                message: `${propertyKey.toString()} must be less than ${maxLength} characters.`,
                method: (input: any) => {
                    return Promise.resolve(isString(input) && input.length <= maxLength);
                }
            }
        });
    };
}
