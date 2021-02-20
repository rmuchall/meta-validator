import {MetaValidator} from "../../MetaValidator";

export function IsValid(): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                decoratorName: IsValid.name,
                message: "This property is always valid.",
                method: (input: any) => {
                    return Promise.resolve(true);
                }
            }
        });
    };
}
