import {MetaValidator} from "../../MetaValidator";
import {isRegEx} from "../../validators/is-reg-ex";

export function IsRegEx(): Function {
    return function (target: Object, propertyKey: string | symbol): void {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                message: `${propertyKey.toString()} is not a valid regular expression.`,
                method: async (input: any) => {
                    return isRegEx(input);
                }
            }
        });
    };
}
