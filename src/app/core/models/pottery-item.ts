import {DataSource} from './data-source';
import {ChronologyLabel} from './chronology-label';

export interface PotteryItemBase {
    id: number;
    object_id: string | null;
}

export interface PotteryItem extends PotteryItemBase {
    description: string | null;
    image_path: string | null;

    data_source: DataSource;
    chronology_label: ChronologyLabel | null;

    created_at: Date;
}

export interface PotteryItemCreateFromPredictionRequest {
    object_id: string | null;
    start_year: number;
    end_year: number;
}
