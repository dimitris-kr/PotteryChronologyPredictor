import { Component } from '@angular/core';
import {Header} from '../../reusable/header/header';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-public-layout',
  imports: [
    Header,
    RouterOutlet
  ],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout {

}
