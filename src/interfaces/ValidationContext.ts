import {Validator} from "./Validator";

export interface ValidationContext {
    // Metadata
    target: Object;
    propertyKey: string;
    // Context
    className: string;
    isNested?: boolean;
    validator?: Validator;
}
