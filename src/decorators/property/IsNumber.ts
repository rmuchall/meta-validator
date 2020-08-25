import {MetaValidator} from "../../MetaValidator";
import {isNumber} from "../../validators/is-number";

export function IsNumber(): Function {
    return function (target: Object, propertyKey: string | symbol): void {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                message: `${propertyKey.toString()} must be a number.`,
                method: async (input: any) => {
                    return isNumber(input);
                }
            }
        });
    };
}
