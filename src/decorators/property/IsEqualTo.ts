import {MetaValidator} from "../../MetaValidator";

export function IsEqualTo(propertyKeyToCompare: string): PropertyDecorator {
    return (target, propertyKey) => {
        MetaValidator.addMetadata({
            target: target,
            propertyKey: propertyKey.toString(),
            className: target.constructor.name,
            validator: {
                decoratorName: IsEqualTo.name,
                message: `${propertyKey.toString()} must be equal to ${propertyKeyToCompare}.`,
                options: [propertyKeyToCompare],
                method: (input: any, obj?: Record<string, any>) => {
                    if (obj) {
                        return Promise.resolve(obj[propertyKeyToCompare] === input);
                    }

                    return Promise.resolve(false);
                }
            }
        });
    };
}
