import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable,
    MatTableDataSource
} from '@angular/material/table';
import {RequestParams, SortOrder} from '../../../core/models/request-params';
import {PotteryItem, PotteryItemFilters, PotteryItemSortBy} from '../../../core/models/pottery-item';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ApiPotteryItems} from '../../../core/services/api-pottery-items';
import {ApiImages} from '../../../core/services/api-images';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {debounceTime, forkJoin, Observable, tap} from 'rxjs';
import {MatSort, MatSortHeader, Sort} from '@angular/material/sort';
import {
    formatYear,
    getMatchClass,
    getTrainDataClass,
    matchExplanation,
    shorten,
    trainDataExplanation
} from '../../../core/utils/helpers';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AsyncPipe, DatePipe, NgClass} from '@angular/common';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {HistoricalPeriod, HistoricalPeriodFilters} from '../../../core/models/historical-period';
import {ApiHistoricalPeriods} from '../../../core/services/api-historical-periods';
import {MatFormField, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {DataSource, DataSourceFilters} from '../../../core/models/data-source';
import {ApiDataSources} from '../../../core/services/api-data-sources';


@Component({
  selector: 'app-pottery-items',
    imports: [
        MatSort,
        MatTable,
        MatPaginator,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatSortHeader,
        MatHeaderCellDef,
        MatProgressSpinner,
        NgClass,
        MatTooltip,
        DatePipe,
        MatIcon,
        MatIconButton,
        RouterLink,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        ReactiveFormsModule,
        MatButton,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        AsyncPipe
    ],
  templateUrl: './pottery-items.html',
  styleUrl: './pottery-items.scss',
})
export class PotteryItems implements OnInit {

    displayedColumns: string[] = [
        'id',
        'image',
        'objectId',
        'description',
        'historicalPeriod',
        'startYear',
        'endYear',
        'trainData',
        'source',
        'createdAt',
        'actions',
    ];

    dataSource = new MatTableDataSource<PotteryItem>([]);
    total = 0;

    imageUrls = new Map<number, string>();

    params: RequestParams<PotteryItemSortBy, PotteryItemFilters> = {
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

    historicalPeriods$!: Observable<HistoricalPeriod[]>;
    dataSources$!: Observable<DataSource[]>;

    constructor(
        private potteryItemsApi: ApiPotteryItems,
        private imagesApi: ApiImages,
        private historicalPeriodsApi: ApiHistoricalPeriods,
        private dataSourcesApi: ApiDataSources,
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder
    ) {
        this.filtersForm = fb.group<PotteryItemFilters>({
            historical_period_id: undefined,
            start_year: undefined,
            end_year: undefined,
            data_source_id: undefined,
            in_train_set: undefined,
        });
    }

    ngOnInit(): void {
        this.loadPage();
        this.loadHistoricalPeriods();
        this.loadDataSources();

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

        this.potteryItemsApi
            .getAll(this.params)
            .subscribe(res => {
                this.dataSource.data = res.items;
                this.total = res.total;
                this.cdr.markForCheck();
                this.loadImages(res.items);
            });
    }

    loadImages(items: PotteryItem[]) {
        const requests = items
            .filter(pi => pi.image_path && !this.imageUrls.has(pi.id))
            .map(pi =>
                this.imagesApi.getImage(pi.image_path!, 'thumb').pipe(
                    tap(blob => {
                        this.imageUrls.set(pi.id, URL.createObjectURL(blob));
                    })
                )
            );

        if (requests.length === 0) return;

        forkJoin(requests).subscribe(() => {
            this.cdr.markForCheck();
        });
    }

    loadHistoricalPeriods() {
        const filters: HistoricalPeriodFilters = {
            non_empty: true,
        }
        this.historicalPeriods$ = this.historicalPeriodsApi.getAllNoPag(filters);
    }

    loadDataSources() {
        const filters: DataSourceFilters = {
            non_empty: true,
        }
        this.dataSources$ = this.dataSourcesApi.getAllNoPag(filters);
    }

    resetPagination(): void {
        this.params.page.offset = 0;
        this.paginator.pageIndex = 0;
    }

    onSortChange(sort: Sort): void {
        if (!sort.direction) return;
        this.params.sort.sort_by = sort.active as PotteryItemSortBy;
        this.params.sort.order = sort.direction as SortOrder;

        this.resetPagination();
        this.loadPage();
    }

    clearFilters(): void {
        this.filtersForm.reset({
            historical_period_id: undefined,
            start_year: undefined,
            end_year: undefined,
            data_source_id: undefined,
            in_train_set: undefined,
        });
    }

    activeFilters(): boolean {
        const values = this.filtersForm.value;
        return values.historical_period_id || values.start_year || values.end_year || values.data_source_id || values.in_train_set;
    }

    ngOnDestroy() {
        for (const url of this.imageUrls.values()) {
            URL.revokeObjectURL(url);
        }
    }

    protected readonly shorten = shorten;
    protected readonly formatYear = formatYear;
    protected readonly getTrainDataClass = getTrainDataClass;
    protected readonly trainDataExplanation = trainDataExplanation;
}
