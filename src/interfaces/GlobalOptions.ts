import {FormatterData} from "./FormatterData";

export interface GlobalOptions {
    isSkipMissingProperties?: boolean;
    customErrorMessageFormatter?: (data: FormatterData) => string;
    customErrorMessages?: Record<string, string>;
}
