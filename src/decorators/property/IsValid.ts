import {MetaValidator} from "../../MetaValidator";

export function IsValid(): Function {
    return function (target: Object, propertyKey: string | symbol): void {
        MetaValidator.addMetadata({
            // Metadata
            target: target,
            propertyKey: propertyKey.toString(),
            // Context
            className: target.constructor.name,
            validator: {
                message: `This property is always valid.`,
                method: async (input: any) => {
                    return true;
                }
            }
        });
    };
}
