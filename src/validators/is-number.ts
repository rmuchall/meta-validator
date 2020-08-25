export function isNumber(input: any): boolean {
    return !isNaN(parseFloat(input)) && isFinite(input);
}
