import {MetaValidator} from "../../MetaValidator";
import {isRegEx} from "../../validators/is-reg-ex";

export function IsRegEx(): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: isRegEx.name,
                message: `${propertyKey.toString()} is not a valid regular expression.`,
                method: (input: any) => {
                    return Promise.resolve(isRegEx(input));
                }
            }
        });
    };
}
