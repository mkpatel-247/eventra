import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(startControlName: string, endControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
        const start = formGroup.get(startControlName)?.value;
        const end = formGroup.get(endControlName)?.value;

        if (start && end && new Date(start) >= new Date(end)) {
            return { dateRangeInvalid: true };
        }

        return null;
    };
}
