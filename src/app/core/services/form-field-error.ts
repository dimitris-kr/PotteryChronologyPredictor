import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormFieldError {
    messages: Map<string, string> = new Map([
        ['required', 'Το πεδίο είναι υποχρεωτικό'],
        ['min', 'πρέπει να είναι ≥'],
        ['max', 'πρέπει να είναι ≤'],
        ['minDate', 'Η ημερομηνία πρέπει να είναι μετά από'],
        ['maxDate', 'Η ημερομηνία είναι μεγαλύτερη από'],
        ['parseDate', 'Μη έγκυρη μορφή ημερομηνίας'],
    ]);

    msg(key: string): string {
        return this.messages.get(key) || 'Σφάλμα.';
    }
}
