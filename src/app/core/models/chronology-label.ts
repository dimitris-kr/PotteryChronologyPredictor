import {HistoricalPeriod} from './historical-period';

export interface ChronologyLabel {
    id: number;
    start_year: number;
    end_year: number;
    midpoint_year: number;
    year_range: number;

    historical_period: HistoricalPeriod;
}
