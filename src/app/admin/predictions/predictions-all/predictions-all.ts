import {Component, OnInit, ViewChild} from '@angular/core';
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
        NgIf,
        DatePipe,
        MatIconButton,
        RouterLink,
        MatHeaderRow,
        MatRow,
        MatHeaderRowDef,
        MatRowDef,
        MatPaginator,
        NgOptimizedImage
    ],
  templateUrl: './predictions-all.html',
  styleUrl: './predictions-all.scss',
})
export class PredictionsAll implements OnInit{

    displayedColumns: string[] = [
        'id',
        'inputImage',
        'inputText',
        'outputType',
        'result',
        'createdAt',
        'actions',
    ];

    dataSource = new MatTableDataSource<Prediction>([]);

    total = 0;
    pageSize = 10;
    pageIndex = 0;
    loading = false;

    constructor(private predictionsApi: ApiPredictions) {}

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
            });
    }
}
