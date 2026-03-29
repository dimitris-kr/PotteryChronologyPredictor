import {DataSource} from './data-source';
import {ChronologyLabel} from './chronology-label';

export type PotteryItemSortBy = 'created_at' | 'id' | 'object_id' | 'description' | 'start_year' | 'end_year';


export interface PotteryItemBase {
    id: number;
    object_id: string | null;
}

export interface PotteryItem extends PotteryItemBase {
    description: string | null;
    image_path: string | null;

    data_source: DataSource;
    chronology_label: ChronologyLabel | null;

    in_train_set?: boolean | null;

    created_at: Date;
}

export interface PotteryItemCreateFromPredictionRequest {
    object_id: string | null;
    start_year: number;
    end_year: number;
}

export interface PotteryItemFilters {
    historical_period_id?: number;
    start_year?: number;
    end_year?: number;
    data_source_id?: number;
    in_train_set?: boolean;
}
