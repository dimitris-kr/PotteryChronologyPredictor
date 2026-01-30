import { Component } from '@angular/core';
import {Loader as LoaderService} from '../../core/services/loader';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-loader',
    imports: [
        AsyncPipe,
        MatProgressBar
    ],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
})
export class Loader {

    loading$: Observable<boolean>;
    constructor(private loader: LoaderService) {
        this.loading$ = this.loader.loading$;
    }
}
