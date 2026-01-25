import { Component, signal } from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet, RouterStateSnapshot} from '@angular/router';
import {Auth} from './core/services/auth';
import {Alert} from './core/services/alert';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PotteryChronologyPredictor');

    constructor(
        private auth: Auth,
        private router: Router,
        private alert: Alert
    ) {
        const token = this.auth.token;

        if (token && this.auth.isTokenExpired(token)) {
            this.auth.logout();
            alert.error('Session expired. Please log in again.');
            this.router.navigate(['/login']);
        }
    }
}
