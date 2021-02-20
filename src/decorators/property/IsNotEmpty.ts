import {MetaValidator} from "../../MetaValidator";
import {isEmpty} from "../../validators/is-empty";

export function IsNotEmpty(): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsNotEmpty.name,
                message: `${propertyKey.toString()} is required.`,
                method: (input: any) => {
                    return Promise.resolve(!isEmpty(input));
                }
            }
        });
    };
}
