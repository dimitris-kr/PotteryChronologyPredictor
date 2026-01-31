export function shorten(text: string, maxWords: number = 10): string {
    let words = text.split(" ");
    if (words.length >= maxWords) {
        words = words.slice(0, maxWords);
    }
    return words.join(' ');
}

export function formatYear(year: number): string {
    let yearAbs = Math.abs(year);
    if (year < 0) return `${yearAbs} BC`;
    else if (year > 0) return `${yearAbs} AD`;
    else return `${yearAbs}`;
}

export function cleanParams<T extends Record<string, any>>(obj: T): { [p: string]: any } {
    return Object.fromEntries(
        Object.entries(obj).filter(
            ([_, v]) => v !== null && v !== undefined && v !== ''
        )
    );
}
