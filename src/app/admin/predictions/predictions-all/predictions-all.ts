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
import {Prediction, PredictionFilters, PredictionSortBy} from '../../../core/models/prediction';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ApiPredictions} from '../../../core/services/api-predictions';
import {MatIcon} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {formatYear, shorten} from '../../../core/utils/helpers';
import {ApiImages} from '../../../core/services/api-images';
import {debounceTime, forkJoin, tap} from 'rxjs';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatSort, MatSortModule, Sort} from '@angular/material/sort';
import {RequestParams, SortOrder} from '../../../core/models/request-params';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

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
        MatProgressSpinner,
        MatSort,
        MatSortModule,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        ReactiveFormsModule,
        MatButton
    ],
    templateUrl: './predictions-all.html',
    styleUrl: './predictions-all.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PredictionsAll implements OnInit {

    displayedColumns: string[] = [
        'id',
        'inputImage',
        'inputText',
        'outputType',
        // 'model',
        'result',
        'createdAt',
        'actions',
    ];

    dataSource = new MatTableDataSource<Prediction>([]);

    total = 0;

    params: RequestParams<PredictionSortBy, PredictionFilters> = {
        page: {
            offset: 0,
            limit: 25,
        },
        sort: {
            sort_by: 'created_at',
            order: 'desc',
        },
        filters: {},
    };

    filtersForm: FormGroup;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private predictionsApi: ApiPredictions,
        private imagesApi: ApiImages,
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
    ) {
        this.filtersForm = this.fb.group<PredictionFilters>({
            input_type: undefined,
            output_type: undefined,
            status: undefined,
        });
    }

    ngOnInit(): void {
        this.loadPage();

        this.filtersForm.valueChanges
            .pipe(debounceTime(300))
            .subscribe(filters => {
                this.params.filters = filters;
                this.resetPagination();
                this.loadPage();
            });
    }

    loadPage(event?: PageEvent): void {
        if (event) {
            this.params.page.limit = event.pageSize;
            this.params.page.offset = event.pageIndex * event.pageSize;
        }

        this.predictionsApi
            .getAll(this.params)
            .subscribe(res => {
                this.dataSource.data = res.items;
                this.total = res.total;
                this.cdr.markForCheck();
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

    onSortChange(sort: Sort): void {
        if (!sort.direction) return;
        this.params.sort.sort_by = sort.active as PredictionSortBy;
        this.params.sort.order = sort.direction as SortOrder;

        this.resetPagination();
        this.loadPage();
    }

    resetPagination(): void {
        this.params.page.offset = 0;
        this.paginator.pageIndex = 0;
    }

    clearFilters(): void {
        this.filtersForm.reset({
            input_type: undefined,
            output_type: undefined,
            status: undefined,
        });
    }

    activeFilters(): boolean {
        const values = this.filtersForm.value;
        return values.input_type || values.output_type || values.status;
    }


    protected readonly shorten = shorten;
    protected readonly formatYear = formatYear;

    ngOnDestroy() {
        for (const url of this.imageUrls.values()) {
            URL.revokeObjectURL(url);
        }
    }
}
