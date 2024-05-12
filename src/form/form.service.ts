import { Injectable,Inject } from '@nestjs/common';
import { IForm } from './form.interface';
import { Form } from './form.model';
import { FieldTable } from '../field-table/field-table.model';

@Injectable()
export class FormService {
    constructor( @Inject('FORM_REPOSITORY') private readonly formRepository: typeof Form) {}

    async create(createFormDto: any): Promise<IForm> {
        const form = await this.formRepository.create<Form>(createFormDto);
        return form;
    }

    async getFormByTeamIdRoleId(team_id : number, role_id: number): Promise<Form | null> {
        return await this.formRepository.findOne({ where: { team_id, role_id }, include: FieldTable});
    }

    async updateForm(team_id: number, role_id: number, updateData: Partial<IForm>): Promise<any> {
        await this.formRepository.update(updateData, { where: { team_id, role_id } });
        return this.formRepository.findOne({ where: { team_id, role_id } });
    }

    async getFormByTeamId(team_id: number): Promise<Form[] | null> {
        return await this.formRepository.findAll({ where: { team_id },attributes:['role_id']});
    }

}