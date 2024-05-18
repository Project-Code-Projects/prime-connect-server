import { Controller, Post, Get, Put, Delete, Body,Param,ParseIntPipe } from '@nestjs/common';
import { FormService } from './form.service';
import { FieldTableService } from '../field-table/field-table.service';
import { FormFieldService } from '../form-field/form-field.service';
import { DocubucketService } from 'src/docu-bucket/docu-bucket.service';
import { IForm } from './form.interface';

@Controller('/form')
export class FormController {
    constructor(private readonly formService: FormService, private readonly docuApi: DocubucketService, private readonly fieldTableService: FieldTableService, private formFieldService: FormFieldService) {}

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

    @Get('/:team_id/:role_id')
    async getFormByTeamIdRoleId(@Param('team_id', ParseIntPipe) team_id: number, @Param('role_id', ParseIntPipe) role_id: number): Promise<any> {
      return await this.formService.getFormByTeamIdRoleId(team_id, role_id);
    }

    @Get('/:team_id')
    async getFormByTeamId(@Param('team_id', ParseIntPipe) team_id: number): Promise<any> {
      const forms = await this.formService.getFormByTeamId(team_id);
      const roles: number[] = []; // Provide an initial value and type for the roles array
      if (forms) forms.forEach((form: any) => {
        roles.push(form.role_id);
      });

      return roles;
    }

    @Post('/field')
    async createFormField(@Body() createFormFieldDto: any) {
      const { sequence, location } = createFormFieldDto;
      console.log("DTO : ",createFormFieldDto);
      console.log(sequence,location);
      return await this.formFieldService.createFormField(createFormFieldDto);
    }

    @Get('/field/:id/:customer_id/:acc_id')

    async getformField(@Param('id') id: number, @Param('customer_id') customer_id: number, @Param('acc_id') acc_id: number): Promise<any> {
      console.log("fieldId: "+id+" customerId: "+customer_id+" accId: "+acc_id);
      const formFieldLocation = await this.formFieldService.getLocationByFieldId(id);
      console.log("field_id"+id+ 'formFieldLocation: '+ formFieldLocation);
      const images = [];
      const coordinates = [];
     
      if(formFieldLocation){
        const location = formFieldLocation.location;


      //   for(let i=0; i<location.length; i++){
      //     if(location[i]){
    
      //       const position = location[i].position;
      //      if(position[i]){
      //       coordinates[i] = position[i].co_ordinate
      //      }   

      //   }
      // }

        for(let i=0; i<location.length; i++){
          if(location[i]){
            const pdf_id = location[i].pdf_id;
            const position = location[i].position;
            // co_ordinates[i] = position[i].co_ordinate
            // coordinates.push(position[i].co_ordinate)
           
            if(position[i]){
              coordinates.push(position[i].co_ordinate);
              // console.log('i', i)
            }
            // console.log('pos i',position[i])
            for( let pos of location[i].position){
              const image = await this.docuApi.getImages(acc_id,customer_id,pdf_id);
              // console.log('images',image);
              if(image){
                images[i] = image.pdf_values[pos.page - 1];
                
              }
            }
          }
        }
      }
      console.log('images',images);	
      console.log('co_ordinates',coordinates);


      return {id: id,images: images, coordinates: coordinates};
      
    }




    @Get('/field/:form_id/:field_id')

    async getformFieldByFormIdFieldId(@Param('form_id') form_id: number, @Param('field_id') field_id: number, @Param('id') id: number): Promise<any> {
      const formField = await this.formFieldService.findByFormIdFieldId(form_id, field_id);
      return formField;
    }

    @Put('/:team_id/:role_id')
    async updateForm(@Param('team_id', ParseIntPipe) team_id: number, @Param('role_id', ParseIntPipe) role_id: number, @Body() updateFormDto: any) {
      const { name,fields } = updateFormDto;
      const form =  await this.formService.updateForm(team_id, role_id, { name });
      const formField = await this.formFieldService.findByFormId(form.id);

      if(formField){
        const len = formField.length;
        for(let i = 0; i < len; i++){
          await this.fieldTableService.deleteFieldTable(formField[i].field_id);
        }
      }

      await this.formFieldService.deleteFormField(form.id);
      
      if(fields){
        const len = fields.length;
          for(let i = 0; i < len; i++){
            const { field_name,field_type,estimated_time,location,sequence } = fields[i];
            const field = {field_name,field_type,estimated_time};
            const newField = await this.fieldTableService.addFieldTable(field);
            if(newField){
              const formField = { location,sequence,form_id: form.id,field_id: newField.id };
              // console.log("formField: ",formField);
             const newFormField = await this.formFieldService.createFormField(formField);
            //  console.log("newFormField: ",newFormField);
            }
          }
        }
    }
}

