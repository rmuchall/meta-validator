import {MetaValidator} from "../../MetaValidator.js";
import {isEmpty} from "../../validators/is-empty.js";

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
                message: "$propertyKey should be empty.",
                method: (input: any) => {
                    return Promise.resolve(isEmpty(input));
                }
            }
        });
    };
}
