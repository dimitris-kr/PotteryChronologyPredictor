import {ChangeDetectorRef, Component} from '@angular/core';
import {PotteryItem} from '../../../core/models/pottery-item';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ApiPotteryItems} from '../../../core/services/api-pottery-items';
import {ApiImages} from '../../../core/services/api-images';
import {Alert} from '../../../core/services/alert';
import {filter, map, switchMap} from 'rxjs';
import {
    formatYear, getColor,
} from '../../../core/utils/helpers';
import {DatePipe, NgStyle} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pottery-items-single',
    imports: [
        DatePipe,
        MatIcon,
        MatIconButton,
        MatTooltip,
        RouterLink,
        MatProgressSpinner,
        NgStyle
    ],
  templateUrl: './pottery-items-single.html',
  styleUrl: './pottery-items-single.scss',
})
export class PotteryItemsSingle {
    potteryItem?: PotteryItem;
    imageUrl?: string;

    constructor(
        private route: ActivatedRoute,
        private potteryItemsApi: ApiPotteryItems,
        private imagesApi: ApiImages,
        private alert: Alert,
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        this.route.paramMap
            .pipe(
                map(params => Number(params.get('id'))),
                filter(id => !isNaN(id)),
                switchMap(id => this.potteryItemsApi.getSingle(id))
            )
            .subscribe(potteryItem => {
                this.potteryItem = potteryItem;
                this.cdr.markForCheck();
                this.loadImage(potteryItem);
            });
    }

    private loadImage(pi: PotteryItem) {
        if (!pi.image_path) return;

        this.imagesApi.getImage(pi.image_path, 'full').subscribe(blob => {
            this.imageUrl = URL.createObjectURL(blob);
            this.cdr.markForCheck();
        });
    }

    protected readonly formatYear = formatYear;
    protected readonly getColor = getColor;
}
