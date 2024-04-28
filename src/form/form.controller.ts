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
          const { name,type,estimatedTime,page,coordinateX,coordinateY,sequence,pdfId } = fields[i];
          const field = {field_name:name,field_type:type,estimated_time:estimatedTime};
          const newField = await this.fieldTableService.addFieldTable(field);
          if(newField){
            const formField = {page,co_ordinate: [coordinateX,coordinateY],sequence,form_id: newForm.id,field_id: newField.id,pdf_id: pdfId};
            console.log("formField: ",formField);
            await this.formFieldService.createFormField(formField);
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
}

