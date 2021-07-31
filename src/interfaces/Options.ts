import {FormatterData} from "./FormatterData";

export interface Options {
    isSkipMissingProperties?: boolean;
    customErrorMessageFormatter?: (data: FormatterData) => string;
    customErrorMessages?: Record<string, string>;
}
