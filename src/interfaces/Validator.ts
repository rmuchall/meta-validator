export interface Validator {
    message: string;
    options?: any[];
    method: (input: any, obj?: Record<string, any>, ...options: any) => Promise<boolean>;
}
