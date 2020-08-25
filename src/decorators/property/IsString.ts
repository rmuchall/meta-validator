import {MetaValidator} from "../../MetaValidator";
import {isString} from "../../validators/is-string";

export function IsString(): Function {
    return function (target: Object, propertyKey: string | symbol): void {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                message: `${propertyKey.toString()} must only contain letters.`,
                method: async (input: any) => {
                    return isString(input);
                }
            }
        });
    };
}
