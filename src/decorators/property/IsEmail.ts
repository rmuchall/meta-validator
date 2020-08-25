import {MetaValidator} from "../../MetaValidator";
import {isEmail} from "../../validators/is-email";

export function IsEmail(): Function {
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
                    return isEmail(input);
                }
            }
        });
    };
}
