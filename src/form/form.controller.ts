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
      console.log('formFieldLocation: ',formFieldLocation);
      const images = [];
      const co_ordinates = [];
      console.log(formFieldLocation);
      if(formFieldLocation){
        const location = formFieldLocation.location;
        // for( let loc of location) {
        //   if(loc){
        //     const pdf_id = loc.pdf_id; 
        //     for( let pos of loc.position){
        //      const image = await this.docuApi.getImages(acc_id,customer_id,pdf_id);
        //      // console.log(image);
        //      if(image){
        //       images.push(image.pdf_values[pos.page - 1]);
        //      }
        //     }
        //   }
        // }
        for(let i=0; i<location.length; i++){
          if(location[i]){
            const pdf_id = location[i].pdf_id;
            const position = location[i].position;
            co_ordinates[i] = position[i].co_ordinate
            for( let pos of location[i].position){
              const image = await this.docuApi.getImages(acc_id,customer_id,pdf_id);
              console.log('images',image);
              if(image){
                images[i] = image.pdf_values[pos.page - 1];
                
              }
            }
          }
        }
      }
      console.log('images',images);	
      console.log('co_ordinates',co_ordinates);


      return {id: id,images: images, coordinates: co_ordinates};
      
    }




    @Get('/field/:form_id/:field_id')

    async getformFieldByFormIdFieldId(@Param('form_id') form_id: number, @Param('field_id') field_id: number, @Param('id') id: number): Promise<any> {
      const formField = await this.formFieldService.findByFormIdFieldId(form_id, field_id);
      return formField;
    }
}

