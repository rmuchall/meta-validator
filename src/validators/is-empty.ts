export function isEmpty(input: unknown): boolean {
    // TODO: Make me more robust
    return input === "" || input === null || input === undefined || Object.keys(input as Record<string, any>).length === 0;
}
