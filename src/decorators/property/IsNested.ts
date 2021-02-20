import {MetaValidator} from "../../MetaValidator";

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
