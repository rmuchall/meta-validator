export function isEmail(input: any): boolean {
    return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>().,;\s@"]+\.?)+[^<>().,;:\s@"]{2,})$/.test(input);
}
