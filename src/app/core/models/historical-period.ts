export interface HistoricalPeriod {
    id: number;
    name: string;
    limit_lower: number;
    limit_upper: number;
}

export const HISTORICAL_PERIOD_COLORS: Record<string, string> = {
    Orientalizing: '#BF6D91',
    Archaic: '#416788',
    Classical: '#899679',
    Hellenistic: '#937EB7'
}


