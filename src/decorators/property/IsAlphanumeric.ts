import {MetaValidator} from "../../MetaValidator";
import {isAlphanumeric} from "../../validators/is-alphanumeric";

export function IsAlphanumeric(): Function {
    return function (target: Object, propertyKey: string | symbol): void {
        MetaValidator.addMetadata({
            target: target,
            propertyKey: propertyKey.toString(),
            className: target.constructor.name,
            validator: {
                message: `${propertyKey.toString()} must contain only letters or numbers.`,
                method: async (input: any) => {
                    return isAlphanumeric(input);
                }
            }
        });
    };
}
