import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormFieldError {
    messages: Map<string, string> = new Map([
        ['required', 'This field is required'],
        ['min', 'must be ≥'],
        ['max', 'must be ≤'],
        ['minDate', 'The date must be after'],
        ['maxDate', 'The date must be before'],
        ['parseDate', 'The date format is invalid'],
    ]);

    msg(key: string): string {
        return this.messages.get(key) || 'Field Error.';
    }
}
