import { Controller, Post, Get, Put, Delete, Body,Param,ParseIntPipe } from '@nestjs/common';
import { FormService } from './form.service';
import { FieldTableService } from '../field-table/field-table.service';
import { FormFieldService } from '../form-field/form-field.service';
import { IForm } from './form.interface';

@Controller('/form')
export class FormController {
    constructor(private readonly formService: FormService, private readonly fieldTableService: FieldTableService, private formFieldService: FormFieldService) {}

    @Post()
    async create(@Body() createFormDto: any) {

        const { name, exist_field, new_field, team_id, role_id } = createFormDto;
        const newForm = await this.formService.create({ name,team_id,role_id });

        
    if(new_field){
        const len = new_field.length;
        for(let i = 0; i < len; i++){
          const { name,type,estimated_time,page,co_ordinate,sequence } = new_field[i];
          const newField = await this.fieldTableService.addFieldTable({field_name:name,field_type:type,estimated_time});
          const formField = {page,co_ordinate,sequence,form_id:newForm.id,field_id:newField.id};
          this.formFieldService.createFormField(formField as any);
        }
      }
    return newForm;
    }
}

