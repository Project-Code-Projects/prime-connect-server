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

        const { name, fields, team_id, role_id } = createFormDto;
        const newForm = await this.formService.create({ name,team_id,role_id });
    if(fields){
      const len = fields.length;
        for(let i = 0; i < len; i++){
          const { field_name,field_type,estimated_time,location,sequence } = fields[i];
          const field = {field_name,field_type,estimated_time};
          const newField = await this.fieldTableService.addFieldTable(field);
          if(newField){
            const formField = { location,sequence,form_id: newForm.id,field_id: newField.id };
            // console.log("formField: ",formField);
           const newFormField = await this.formFieldService.createFormField(formField);
           console.log("newFormField: ",newFormField);
          }
        }
      }
    return newForm;
    }

    @Post('/field')
    async createFormField(@Body() createFormFieldDto: any) {
      const { sequence, location } = createFormFieldDto;
      console.log("DTO : ",createFormFieldDto);
      console.log(sequence,location);
      return await this.formFieldService.createFormField(createFormFieldDto);
    }

    @Get('/field/:id')

    async getformField(@Param('id') id: number): Promise<any> {
      const formField = await this.formFieldService.findOne(id);
      return formField;
    }

    @Get('/field/:form_id/:field_id')

    async getformFieldByFormIdFieldId(@Param('form_id') form_id: number, @Param('field_id') field_id: number, @Param('id') id: number): Promise<any> {
      const formField = await this.formFieldService.findByFormIdFieldId(form_id, field_id);
      return formField;
    }
}

