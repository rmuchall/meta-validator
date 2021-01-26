import {MetaValidator} from "../../MetaValidator";
import {isNumber} from "../../validators/is-number";

export function IsNumber(): Function {
    return (target: Object, propertyKey: string | symbol): void => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsNumber.name,
                message: `${propertyKey.toString()} must be a number.`,
                method: (input: any) => {
                    return Promise.resolve(isNumber(input));
                }
            }
        });
    };
}
