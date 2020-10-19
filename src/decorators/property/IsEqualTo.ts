import {MetaValidator} from "../../MetaValidator";

export function IsEqualTo(propertyKeyToCompare: string): Function {
    return (target: Object, propertyKey: string | symbol): void => {
        MetaValidator.addMetadata({
            target: target,
            propertyKey: propertyKey.toString(),
            className: target.constructor.name,
            validator: {
                decoratorName: IsEqualTo.name,
                message: `${propertyKey.toString()} must be equal to ${propertyKeyToCompare}.`,
                options: [propertyKeyToCompare],
                method: async (input: any, obj?: Record<string, any>) => {
                    if (obj)
                        return obj[propertyKeyToCompare] === input;
                    else
                        return false;
                }
            }
        });
    };
}
