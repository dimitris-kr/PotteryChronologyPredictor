import {isClassification, Prediction, PredictionMatch, PredictionStatus} from '../models/prediction';
import {HISTORICAL_PERIOD_COLORS} from '../models/historical-period';

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

export function matchExplanation(prediction: Prediction): string {
    if (isClassification(prediction)) {
        switch (prediction.match) {
            case "exact":
                return "The predicted period is the same as the true period.";
            case "none":
                return "The predicted period is different from the true period.";
        }
    } else {
        switch (prediction.match) {
            case "exact":
                return "Predicted and true date ranges overlap by ≥ 90%.";
            case "close":
                return "Date ranges overlap by 40–89%, or their midpoints differ by ≤ 50 years.";
            case "none":
                return "Date range overlap is < 40% and midpoint difference is > 50 years.";
        }
    }

    return "No verified chronology is available, the prediction cannot be evaluated.";
}

export function getColor(period?: string) {
    if (!period) return null;
    return HISTORICAL_PERIOD_COLORS[period];
}

export const statusClassMap: Record<PredictionStatus, string> = {
    validated: 'success',
    pending: 'warning',
};

export function getStatusClass(p: Prediction):string {
    return statusClassMap[p.status];
}

export const matchClassMap: Record<PredictionMatch, string> = {
    exact: 'success',
    close: 'warning',
    none: 'danger',
    unknown: 'disabled',
};

export function getMatchClass(p: Prediction): string {
    return matchClassMap[p.match]
}
