import {MetaValidator} from "../../MetaValidator.js";

export function IsBoolean(): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsBoolean.name,
                message: "$propertyKey should be empty.",
                method: (input: any) => {
                    return Promise.resolve(typeof input === "boolean");
                }
            }
        });
    };
}
