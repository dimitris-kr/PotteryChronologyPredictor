export interface HistoricalPeriod {
    id: number;
    name: string;
    limit_lower: number;
    limit_upper: number;
}

export const HISTORICAL_PERIOD_COLORS: Record<string, string> = {
    orientalizing: '#BF6D91',
    archaic: '#416788',
    classical: '#899679',
    hellenistic: '#937EB7'
}

export interface HistoricalPeriodFilters {
    'non_empty'?: boolean;
}
