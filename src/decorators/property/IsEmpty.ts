import {MetaValidator} from "../../MetaValidator";
import {isEmpty} from "../../validators/is-empty";

export function IsEmpty(): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsEmpty.name,
                message: `${propertyKey.toString()} should be empty.`,
                method: (input: any) => {
                    return Promise.resolve(isEmpty(input));
                }
            }
        });
    };
}
