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
        return await this.formFieldRepository.bulkCreate([createFormFieldDto]);
    
    }

    async findOne(id: number): Promise<FormField | null> {
        const formField = await this.formFieldRepository.findOne<FormField>({where: { id }});
        return formField;
    }

    async findByFormIdFieldId(form_id: number, field_id: number): Promise<FormField | null> {
        const formField = await this.formFieldRepository.findOne<FormField>({where: { form_id, field_id }});
        return formField;
    }

    async findByFieldId(field_id: number): Promise<FormField | null> {
        const formField = await this.formFieldRepository.findOne<FormField>({where: { field_id }});
        return formField;
    }

    async findAllFormField(): Promise<FormField[]> {
        const formFields = await this.formFieldRepository.findAll<FormField>();
        return formFields;
    }
}
