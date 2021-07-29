import {FormatterData} from "../interfaces/FormatterData";

// Tokens:
// $propertyKey
// $propertyValue
// $options<number>
export function validationErrorFormatter(data: FormatterData): string {
    let errorMessage = data.message;
    errorMessage = errorMessage.replace("$propertyKey", data.propertyKey);
    errorMessage = errorMessage.replace("$propertyValue", data.propertyValue);

    if (data.options) {
        for (let i = 0; i < data.options.length; i++) {
            errorMessage = errorMessage.replace(`$options${i}`, data.options[i]);
        }
    }

    return errorMessage;
}
