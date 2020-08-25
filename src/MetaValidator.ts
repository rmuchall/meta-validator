import {ValidationContext} from "./interfaces/ValidationContext";
import {ValidatorOptions} from "./interfaces/options/ValidatorOptions";
import {Metadata} from "./interfaces/Metadata";
import {ValidationErrors} from "./interfaces/ValidationErrors";

export class MetaValidator {
    private static metadata: Record<string, Metadata> = {};

    static async validate(obj: Record<string, any>, options?: ValidatorOptions): Promise<ValidationErrors> {
        if (!obj || !obj.constructor) {
            throw new Error("Cannot validate input that is not an instance of a class");
        }

        const className = obj.constructor.name;
        if (!MetaValidator.metadata[className]) {
            throw new Error(`No validation metadata found for ${className}`);
        }

        if (!options) {
            // Set default options
            options = {
                isSkipMissingProperties: false
            };
        }

        // Check for extraneous properties
        for (const propertyKey of Object.keys(obj)) {
            if (!MetaValidator.metadata[className][propertyKey]) {
                throw new Error(`Extraneous property [${propertyKey}] found in instance of class [${className}]`);
            }
        }

        const validationErrors: ValidationErrors = {};
        for (const propertyKey of Object.keys(MetaValidator.metadata[className])) {

            // Skip missing properties?
            if (!Object.hasOwnProperty.call(obj, propertyKey) &&
                options.isSkipMissingProperties) {
                continue;
            }

            for (const context of MetaValidator.metadata[className][propertyKey]) {
                if ((context.isNested && context.validator) || (!context.isNested && !context.validator)) {
                    throw new Error("Invalid metadata");
                }

                // Nested
                if (context.isNested) {
                    const nestedValidationErrors = await MetaValidator.validate(obj[propertyKey]);

                    if (Object.keys(nestedValidationErrors).length > 0) {
                        validationErrors[context.propertyKey] = nestedValidationErrors;
                    }

                    continue;
                }

                if (!context.validator) {
                    throw new Error("No validator specified");
                }

                // Validator method
                const isValid: boolean = await context.validator.method(obj[propertyKey], obj, context.validator.options);
                if (!isValid) {
                    if (!validationErrors[context.propertyKey]) {
                        validationErrors[context.propertyKey] = [];
                    }

                    (validationErrors[context.propertyKey] as string[]).push(context.validator.message);
                }

            }
        }

        return validationErrors;
    }

    static addMetadata(context: ValidationContext): void {
        if (!MetaValidator.metadata[context.className]) {
            MetaValidator.metadata[context.className] = {};
        }

        if (!MetaValidator.metadata[context.className][context.propertyKey]) {
            MetaValidator.metadata[context.className][context.propertyKey] = [];
        }

        MetaValidator.metadata[context.className][context.propertyKey].push(context);
    }

    static clearMetadata(): void {
        MetaValidator.metadata = {};
    }
}
