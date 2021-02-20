import {MetaValidator} from "../../MetaValidator";
import {isAlpha} from "../../validators/is-alpha";

export function IsAlpha(): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsAlpha.name,
                message: `${propertyKey.toString()} must only contain letters.`,
                method: (input: any) => {
                    return Promise.resolve(isAlpha(input));
                }
            }
        });
    };
}
