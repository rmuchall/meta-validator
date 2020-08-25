import {MetaValidator} from "../../MetaValidator";

export function IsEqualTo(propertyKeyToCompare: string): Function {
    return function (target: Object, propertyKey: string | symbol): void {
        MetaValidator.addMetadata({
            target: target,
            propertyKey: propertyKey.toString(),
            className: target.constructor.name,
            validator: {
                message: `${propertyKey.toString()} must be equal to ${propertyKeyToCompare}.`,
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
