import {MetaValidator} from "../../MetaValidator";
import {isAlphanumeric} from "../../validators/is-alphanumeric";

export function IsAlphanumeric(): Function {
    return (target: Object, propertyKey: string | symbol): void => {
        MetaValidator.addMetadata({
            target: target,
            propertyKey: propertyKey.toString(),
            className: target.constructor.name,
            validator: {
                decoratorName: IsAlphanumeric.name,
                message: `${propertyKey.toString()} must contain only letters or numbers.`,
                method: (input: any) => {
                    return Promise.resolve(isAlphanumeric(input));
                }
            }
        });
    };
}
