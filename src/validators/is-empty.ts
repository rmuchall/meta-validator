export function isEmpty(input: any): boolean {
    // TODO: Make me more robust
    return input === "" || input === null || input === undefined || Object.keys(input).length === 0;
}
