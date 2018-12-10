import { AbstractControl, ValidatorFn } from '@angular/forms';

function conditionallyRequired(predicate: ConditionallyRequiredPredicate): ValidatorFn {
    return (control: AbstractControl) => {
        const isRequired = predicate(control);
        
        if (!isRequired || control.value) {
            return null;
        }
        
        return { required: true };
    };
}

type ConditionallyRequiredPredicate = (control: AbstractControl) => boolean;

export {
    conditionallyRequired,
    ConditionallyRequiredPredicate,
};
