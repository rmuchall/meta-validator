export interface ValidationErrors {
    [key: string]: string[] | ValidationErrors[] | ValidationErrors;
}
