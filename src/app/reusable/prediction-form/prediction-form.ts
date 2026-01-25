import {Component} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
    selector: 'app-prediction-form',
    imports: [
        MatIconButton,
        MatIcon,
        MatTooltip,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatButtonToggleGroup,
        MatButtonToggle
    ],
    templateUrl: './prediction-form.html',
    styleUrl: './prediction-form.scss',
})
export class PredictionForm {
    form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group(
            {
                text: [''],
                image: [null],
                task: ['classification', Validators.required]
            },
            {
                validators: this.textOrImageRequired
            }
        )
    }

    textOrImageRequired(form: AbstractControl) {
        const text = form.get('text')?.value;
        const image = form.get('image')?.value;

        return text || image ? null : {textOrImageRequired: true};
    }

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            this.form.patchValue({ image: file });
            this.form.updateValueAndValidity();
        }
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    onFileDrop(event: DragEvent) {
        event.preventDefault();
        const file = event.dataTransfer?.files[0];
        if (file) {
            this.form.patchValue({ image: file });
        }
    }

    submit() {

    }
}
