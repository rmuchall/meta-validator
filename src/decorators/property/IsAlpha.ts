import {MetaValidator} from "../../MetaValidator";
import {isAlpha} from "../../validators/is-alpha";

export function IsAlpha(): Function {
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
                    return isAlpha(input);
                }
            }
        });
    };
}
