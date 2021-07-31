import {MetaValidator} from "../../MetaValidator";
import {isString} from "../../validators/is-string";

export function IsMinLength(minLength: number): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            target: target,
            propertyKey: propertyKey.toString(),
            className: target.constructor.name,
            validator: {
                decoratorName: IsMinLength.name,
                message: "$propertyKey must have at least $option0 characters.",
                options: [minLength],
                method: (input: any) => {
                    return Promise.resolve(isString(input) && input.length >= minLength);
                }
            }
        });
    };
}
