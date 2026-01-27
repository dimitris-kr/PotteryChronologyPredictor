import {ModelVersion} from './model';
import {HistoricalPeriod} from './historical-period';

export interface PredictionBase {
    id: number;

    // inputs
    input_text: string | null;
    input_image_url: string | null;

    status: 'pending' | 'validated';
    created_at: Date;

    model_version: ModelVersion;
}

export interface ClassificationBreakdown {
    probabilities: Record<string, number>;
}

export interface RegressionPrediction {
    prediction: number;
    std: number;
    ci_lower: number;
    ci_upper: number;
}

export interface RegressionBreakdown {
    start_year?: RegressionPrediction;
    year_range?: RegressionPrediction;
}

export interface ClassificationPrediction extends PredictionBase {
    task: 'classification';

    historical_period: HistoricalPeriod;

    start_year: null;
    end_year: null;
    midpoint_year: null;
    year_range: null;

    breakdown: ClassificationBreakdown;
}

export interface RegressionPredictionResult extends PredictionBase {
    task: 'regression';

    historical_period: null;

    start_year: number;
    end_year: number;
    midpoint_year: number;
    year_range: number;

    breakdown: RegressionBreakdown;
}

export type Prediction =
    | ClassificationPrediction
    | RegressionPredictionResult;

export function isClassification(
    p: Prediction
): p is ClassificationPrediction {
    return p.task === 'classification';
}
