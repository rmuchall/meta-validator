export interface Validator {
    decoratorName: string; // Used for custom validation message lookup
    message: string; // Default validation message
    options?: any[]; // Validator options

    // input: object property value to be validated
    // obj: object being validated
    // options: any extra validator options (defined above)
    method: (input: any, obj?: Record<string, any>, ...options: any) => Promise<boolean>;
}
