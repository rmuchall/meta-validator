import {MetaValidator} from "../../MetaValidator.js";
import {isEmail} from "../../validators/is-email.js";

export function IsEmail(): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsEmail.name,
                message: "$propertyKey must be a valid email address.",
                method: (input: any) => {
                    return Promise.resolve(isEmail(input));
                }
            }
        });
    };
}
