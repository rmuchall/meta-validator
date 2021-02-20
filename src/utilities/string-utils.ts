export function formatValidationError(message: string, propertyKey: string, value: string, options?: any[]): string {
    let errorMessage = message;
    errorMessage = errorMessage.replace("$propertyKey", propertyKey);
    errorMessage = errorMessage.replace("$value", value);

    if (options) {
        for (let i = 0; i < options.length; i++) {
            errorMessage = errorMessage.replace(`$options${i}`, options[i]);
        }
    }

    return errorMessage;
}
