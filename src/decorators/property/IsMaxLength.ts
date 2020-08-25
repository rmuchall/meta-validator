import {MetaValidator} from "../../MetaValidator";
import {isString} from "../../validators/is-string";

export function IsMaxLength(maxLength: number): Function {
    return function (target: Object, propertyKey: string | symbol): void {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                message: `${propertyKey.toString()} must be less than ${maxLength} characters.`,
                method: async (input: any) => {
                    return isString(input) && input.length <= maxLength;
                }
            }
        });
    };
}
