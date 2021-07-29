import {ValidationContext} from "./interfaces/ValidationContext";
import {GlobalOptions} from "./interfaces/GlobalOptions";
import {Metadata} from "./interfaces/Metadata";
import {ValidationErrors} from "./interfaces/ValidationErrors";
import {validationErrorFormatter} from "./utilities/validation-error-formatter";
import {FormatterData} from "./interfaces/FormatterData";

export abstract class MetaValidator {
    private static metadata: Record<string, Metadata> = {};
    private static circularCheck: Set<Record<string, any>> = new Set<Record<string, any>>();

    static validate(obj: Record<string, any>[], options?: GlobalOptions): Promise<ValidationErrors[]>
    static validate(obj: Record<string, any>, options?: GlobalOptions): Promise<ValidationErrors>
    static validate(obj: Record<string, any> | Record<string, any>[], options?: GlobalOptions): Promise<ValidationErrors[] | ValidationErrors> {
        MetaValidator.circularCheck.clear();

        // Set default globalOptions
        const globalOptions = Object.assign<GlobalOptions, Partial<GlobalOptions>>({}, {
            isSkipMissingProperties: options?.isSkipMissingProperties || false,
            customErrorMessageFormatter: options?.customErrorMessageFormatter,
            customErrorMessages: options?.customErrorMessages || {}
        });

        if (Array.isArray(obj)) {
            return MetaValidator.validateArray(obj, globalOptions);
        }

        return MetaValidator.validateObject(obj, globalOptions);
    }

    private static async validateObject(obj: Record<string, any>, globalOptions: GlobalOptions): Promise<ValidationErrors> {
        // Check for circular dependencies
        if (MetaValidator.circularCheck.has(obj)) {
            throw new Error("Object has a circular dependency");
        }
        MetaValidator.circularCheck.add(obj);

        // Check obj is an instance of a class
        if (!obj || !obj.constructor) {
            throw new Error("Cannot validate input that is not an instance of a class");
        }

        // Check obj has corresponding validation metadata
        const className = obj.constructor.name;
        if (!MetaValidator.metadata[className]) {
            throw new Error(`No validation metadata found for ${className}`);
        }

        // Check for extraneous properties
        for (const propertyKey of Object.keys(obj)) {
            if (!MetaValidator.metadata[className][propertyKey]) {
                throw new Error(`Extraneous property [${propertyKey}] found in instance of class [${className}]`);
            }
        }

        // Perform validation
        const validationErrors: ValidationErrors = {};
        for (const propertyKey of Object.keys(MetaValidator.metadata[className])) {
            // Skip missing properties?
            if (!Object.hasOwnProperty.call(obj, propertyKey) &&
                globalOptions.isSkipMissingProperties) {
                continue;
            }

            for (const context of MetaValidator.metadata[className][propertyKey]) {
                if ((context.isNested && context.validator) || (!context.isNested && !context.validator)) {
                    throw new Error("Invalid metadata");
                }

                // Nested
                if (context.isNested) {
                    let nestedValidationErrors: ValidationErrors | ValidationErrors[];
                    if (Array.isArray(obj[propertyKey])) {
                        nestedValidationErrors = await MetaValidator.validateArray(obj[propertyKey], globalOptions);
                        if (nestedValidationErrors.length > 0) {
                            validationErrors[context.propertyKey] = nestedValidationErrors;
                        }
                    } else {
                        nestedValidationErrors = await MetaValidator.validateObject(obj[propertyKey], globalOptions);
                        if (Object.keys(nestedValidationErrors).length > 0) {
                            validationErrors[context.propertyKey] = nestedValidationErrors;
                        }
                    }

                    continue;
                }

                if (!context.validator) {
                    throw new Error("No validator specified");
                }

                // Execute validator
                const isValid: boolean = await context.validator.method(obj[propertyKey], obj, context.validator.options);

                if (!isValid) {
                    if (!validationErrors[context.propertyKey]) {
                        validationErrors[context.propertyKey] = [];
                    }

                    // Choose error formatter
                    let errorFormatter: (data: FormatterData) => string;
                    if (globalOptions.customErrorMessageFormatter) {
                        // Custom validation error formatter
                        errorFormatter = globalOptions.customErrorMessageFormatter;
                    } else {
                        // Default validation error formatter
                        errorFormatter = validationErrorFormatter;
                    }

                    // Build formatter data
                    const errorFormatterData: FormatterData = {
                        message: globalOptions.customErrorMessages![context.validator.decoratorName] || context.validator.message,
                        propertyKey: context.propertyKey,
                        propertyValue: obj[propertyKey],
                        options: context.validator.options
                    };

                    // Add formatted validation error message
                    (validationErrors[context.propertyKey] as string[]).push(errorFormatter(errorFormatterData));
                }

            }
        }

        return validationErrors;
    }

    private static async validateArray(objArray: Record<string, any>[], options: GlobalOptions): Promise<ValidationErrors[]> {
        const validationErrorArray: ValidationErrors[] = [];
        for (const obj of objArray) {
            validationErrorArray.push(await MetaValidator.validateObject(obj, options));
        }

        return validationErrorArray;
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
