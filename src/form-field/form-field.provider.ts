import { FormField } from './form-field.model';

export const formFieldProvider = {
    provide: 'FORM_FIELD_REPOSITORY',
    useValue: FormField,
} 