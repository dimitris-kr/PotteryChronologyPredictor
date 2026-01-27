export function parseBackendDate(value: string | null): Date | null {
    if (!value) return null;
    return new Date(value.endsWith('Z') ? value : value + 'Z');
}
