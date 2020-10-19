import {MetaValidator} from "../../MetaValidator";
import {isString} from "../../validators/is-string";

export function IsMinLength(minLength: number): Function {
    return (target: Object, propertyKey: string | symbol): void => {
        MetaValidator.addMetadata({
            target: target,
            propertyKey: propertyKey.toString(),
            className: target.constructor.name,
            validator: {
                decoratorName: IsMinLength.name,
                message: `${propertyKey.toString()} must have at least ${minLength} characters.`,
                method: async (input: any) => {
                    return isString(input) && input.length >= minLength;
                }
            }
        });
    };
}
