import {DataSource} from './data-source';
import {ChronologyLabel} from './chronology-label';

export interface PotteryItem {
    id: number;
    object_id: string | null;
    description: string | null;
    image_path: string | null;

    data_source: DataSource;
    chronology_label: ChronologyLabel | null;

    created_at: Date;
}
