export function isNumber(input: unknown): boolean {
    return !isNaN(parseFloat(input as string)) && isFinite(input as number);
}
