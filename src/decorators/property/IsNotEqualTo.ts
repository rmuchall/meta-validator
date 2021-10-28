import {MetaValidator} from "../../MetaValidator";

export function IsNotEqualTo(propertyKeyToCompare: string): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            target: target,
            propertyKey: propertyKey.toString(),
            className: target.constructor.name,
            validator: {
                decoratorName: IsNotEqualTo.name,
                message: "$propertyKey must not be equal to $option0.",
                options: [propertyKeyToCompare],
                method: (input: any, obj?: Record<string, any>) => {
                    if (obj) {
                        return Promise.resolve(obj[propertyKeyToCompare] !== input);
                    }

                    return Promise.resolve(false);
                }
            }
        });
    };
}
