import {ChangeDetectorRef, Component} from '@angular/core';
import {isClassification, Prediction} from '../../../core/models/prediction';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ApiPredictions} from '../../../core/services/api-predictions';
import {filter, map, switchMap} from 'rxjs';
import {DatePipe, NgStyle} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {formatYear, getColor} from '../../../core/utils/helpers';
import {ApiImages} from '../../../core/services/api-images';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-predictions-single',
    imports: [
        MatIcon,
        MatIconButton,
        MatTooltip,
        RouterLink,
        DatePipe,
        NgStyle,
        MatProgressSpinner
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

    protected readonly isClassification = isClassification;
    protected readonly getColor = getColor;
    protected readonly formatYear = formatYear;
}
