import {MetaValidator} from "../../MetaValidator";

export function IsNested(): Function {
    return function (target: Object, propertyKey: string | symbol): void {
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
