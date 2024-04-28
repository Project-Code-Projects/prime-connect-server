import { Injectable,Inject } from '@nestjs/common';
import { FormField } from './form-field.model';

@Injectable()

export class FormFieldService {
    constructor(
        @Inject('FORM_FIELD_REPOSITORY') private formFieldRepository: typeof FormField,
    ) {}

    async createFormField(createFormFieldDto: any ): Promise<any> {
        // const formField = await this.formFieldRepository.create<any>(createFormFieldDto);
        // return formField;

        console.log("formField",createFormFieldDto);
        return await this.formFieldRepository.bulkCreate(createFormFieldDto);
    
    }

    async findAllFormField(): Promise<FormField[]> {
        const formFields = await this.formFieldRepository.findAll<FormField>();
        return formFields;
    }
}
