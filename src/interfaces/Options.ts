import {FormatterData} from "./FormatterData.js";

export interface Options {
    isSkipUndefinedValues?: boolean;
    customErrorMessageFormatter?: (data: FormatterData) => string;
    customErrorMessages?: Record<string, string>;
}
