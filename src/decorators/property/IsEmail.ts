import {MetaValidator} from "../../MetaValidator";
import {isEmail} from "../../validators/is-email";

export function IsEmail(): Function {
    return (target: Object, propertyKey: string | symbol): void => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsEmail.name,
                message: `${propertyKey.toString()} must be a valid email address.`,
                method: (input: any) => {
                    return Promise.resolve(isEmail(input));
                }
            }
        });
    };
}
