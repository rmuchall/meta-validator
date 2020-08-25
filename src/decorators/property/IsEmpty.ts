import {MetaValidator} from "../../MetaValidator";
import {isEmpty} from "../../validators/is-empty";

export function IsEmpty(): Function {
    return function (target: Object, propertyKey: string | symbol): void {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                message: `${propertyKey.toString()} should be empty.`,
                method: async (input: any) => {
                    return isEmpty(input);
                }
            }
        });
    };
}
