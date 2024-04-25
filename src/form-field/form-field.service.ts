import { Injectable,Inject } from '@nestjs/common';
import { FormField } from './form-field.model';
import { IFormField } from './form-field.interface';
import { Form } from '../form/form.model';

@Injectable()

export class FormFieldService {
    constructor(
        @Inject('FORM_FIELD_REPOSITORY') private formFieldRepository: typeof FormField,
    ) {}

    async createFormField(createFormFieldDto: IFormField ): Promise<FormField> {
        const formField = await this.formFieldRepository.create<FormField>(createFormFieldDto as any);
        return formField;
    }

    async findAllFormField(): Promise<FormField[]> {
        const formFields = await this.formFieldRepository.findAll<FormField>();
        return formFields;
    }
}
