import {MetaValidator} from "../../MetaValidator.js";

export function IsNested(): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            isNested: true
        });
    };
}
