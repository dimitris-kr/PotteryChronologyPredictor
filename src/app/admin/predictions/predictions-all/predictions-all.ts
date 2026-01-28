import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable,
    MatTableDataSource
} from '@angular/material/table';
import {Prediction} from '../../../core/models/prediction';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ApiPredictions} from '../../../core/services/api-predictions';
import {MatIcon} from '@angular/material/icon';
import {DatePipe, NgIf, NgOptimizedImage} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {formatYear, shorten} from '../../../core/utils/helpers';
import {environment} from '../../../../environments/environment';
import {getApiUrl} from '../../../core/utils/request';
import {ApiImages} from '../../../core/services/api-images';
import {forkJoin, tap} from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-predictions-all',
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatCellDef,
        MatHeaderCellDef,
        MatIcon,
        DatePipe,
        MatIconButton,
        RouterLink,
        MatHeaderRow,
        MatRow,
        MatHeaderRowDef,
        MatRowDef,
        MatPaginator,
        MatProgressSpinner
    ],
  templateUrl: './predictions-all.html',
  styleUrl: './predictions-all.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictionsAll implements OnInit{

    displayedColumns: string[] = [
        'id',
        'inputImage',
        'inputText',
        'outputType',
        'model',
        'result',
        'createdAt',
        'actions',
    ];

    dataSource = new MatTableDataSource<Prediction>([]);

    total = 0;
    pageSize = 25;
    pageIndex = 0;
    loading = false;

    constructor(
        private predictionsApi: ApiPredictions,
        private imagesApi: ApiImages,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.loadPage();
    }

    loadPage(event?: PageEvent): void {
        if (event) {
            this.pageSize = event.pageSize;
            this.pageIndex = event.pageIndex;
        }

        const offset = this.pageIndex * this.pageSize;

        this.loading = true;

        this.predictionsApi
            .getAll(this.pageSize, offset)
            .subscribe(res => {
                this.dataSource.data = res.items;
                this.total = res.total;
                this.loading = false;
                this.cdr.markForCheck();
                /*for (let p of res.items) {
                    this.loadImage(p);
                }*/
                this.loadImages(res.items);
            });
    }

    imageUrls = new Map<number, string>();

    loadImages(items: Prediction[]) {
        const requests = items
            .filter(p => p.input_image_path && !this.imageUrls.has(p.id))
            .map(p =>
                this.imagesApi.getImage(p.input_image_path!, 'thumb').pipe(
                    tap(blob => {
                        this.imageUrls.set(p.id, URL.createObjectURL(blob));
                    })
                )
            );

        if (requests.length === 0) return;

        forkJoin(requests).subscribe(() => {
            this.cdr.markForCheck();
        });
    }

    protected readonly shorten = shorten;
    protected readonly formatYear = formatYear;
    protected readonly getApiUrl = getApiUrl;

    ngOnDestroy() {
        for (const url of this.imageUrls.values()) {
            URL.revokeObjectURL(url);
        }
    }
}
