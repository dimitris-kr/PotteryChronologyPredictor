import {ChangeDetectorRef, Component} from '@angular/core';
import {isClassification, Prediction} from '../../../core/models/prediction';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ApiPredictions} from '../../../core/services/api-predictions';
import {filter, map, switchMap} from 'rxjs';
import {DatePipe, DecimalPipe, NgClass, NgStyle, PercentPipe} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {
    formatYear,
    getColor,
    getMatchClass,
    getStatusClass,
    matchExplanation,
} from '../../../core/utils/helpers';
import {ApiImages} from '../../../core/services/api-images';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {
    ClassificationBreakdownChart
} from '../../../reusable/charts/classification-breakdown-chart/classification-breakdown-chart';
import {RegressionBreakdownChart} from '../../../reusable/charts/regression-breakdown-chart/regression-breakdown-chart';

@Component({
  selector: 'app-predictions-single',
    imports: [
        MatIcon,
        MatIconButton,
        MatTooltip,
        RouterLink,
        DatePipe,
        NgStyle,
        MatProgressSpinner,
        PercentPipe,
        DecimalPipe,
        NgClass,
        MatButton,
        ClassificationBreakdownChart,
        RegressionBreakdownChart
    ],
  templateUrl: './predictions-single.html',
  styleUrl: './predictions-single.scss',
})
export class PredictionsSingle {
    prediction?: Prediction;
    imageUrl?: string;

    constructor(
        private route: ActivatedRoute,
        private predictionsApi: ApiPredictions,
        private imagesApi: ApiImages,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                map(params => Number(params.get('id'))),
                filter(id => !isNaN(id)),
                switchMap(id => this.predictionsApi.getSingle(id))
            )
            .subscribe(prediction => {
                this.prediction = prediction;
                this.cdr.markForCheck();
                this.loadImage(prediction);
            });
    }

    private loadImage(p: Prediction) {
        if (!p.input_image_path) return;

        this.imagesApi.getImage(p.input_image_path, 'full').subscribe(blob => {
            this.imageUrl = URL.createObjectURL(blob);
            this.cdr.markForCheck();
        });
    }

    get sortedProbabilities(): Array<{ name: string; value: number }> {
        if (!this.prediction || !isClassification(this.prediction) || !this.prediction.breakdown) return [];

        return Object.entries(this.prediction.breakdown.probabilities)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }



    protected readonly isClassification = isClassification;
    protected readonly getColor = getColor;
    protected readonly formatYear = formatYear;
    protected readonly length = length;
    protected readonly matchExplanation = matchExplanation;
    protected readonly getStatusClass = getStatusClass;
    protected readonly getMatchClass = getMatchClass;
    protected readonly Math = Math;
}
