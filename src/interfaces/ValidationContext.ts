import {Validator} from "./Validator.js";

export interface ValidationContext {
    // Metadata
    target: Object; // The constructor of the class to be validated
    propertyKey: string; // The object property key to be validated
    // Context
    className: string; // The object to be validated class name
    isNested?: boolean; // Nested validation?
    validator?: Validator; // The validator to execute
}
