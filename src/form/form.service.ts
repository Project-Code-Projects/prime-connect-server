import { Injectable,Inject } from '@nestjs/common';
import { IForm } from './form.interface';
import { Form } from './form.model';

@Injectable()
export class FormService {
    constructor( @Inject('FORM_REPOSITORY') private readonly formRepository: typeof Form) {}

    async create(createFormDto: any): Promise<IForm> {
        const form = await this.formRepository.create<Form>(createFormDto);
        return form;
    }
}