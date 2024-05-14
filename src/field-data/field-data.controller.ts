
import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Bind,
  Param,
  Put,
} from '@nestjs/common';
import { PdfDataController } from 'src/pdf-data/pdf-data.controller';
import { IFieldData } from './field-data.interface';
import { FieldDataService } from './field-data.service';
import { UpdateFieldDataDto } from './field-data.dto';
import { FieldTableService } from './../field-table/field-table.service';
// import { FieldTableService } from '../field-table/field-table.service';
@Controller('field-data')
export class FieldDataController {
  constructor(private readonly fieldDataService: FieldDataService, private readonly fieldTableService: FieldTableService) {}

  @Get()
  async findAllFieldData(): Promise<any> {
    return await this.fieldDataService.findAllFieldData();
  }

  @Put('update')
  async updateFieldData(
    @Body() updateFieldDataDto: any,
  ): Promise<void> {
    const { value, order_id, field_id, time_interval, assigned_to } = updateFieldDataDto;
    if(value){
      
      return await this.fieldDataService.updateFieldDataByFieldId(value, order_id, field_id, time_interval, assigned_to);
    }
   
  }

  @Get('fields/:id') // Define the route including the employee ID
  async getTasksByEmployee(@Param('id') id: number): Promise<IFieldData> {
    try {
      return await this.fieldDataService.getFieldDataById(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('fields/:order_id/:assigned_to') // Define the route including the employee ID
  async getTasksByOrder(@Param('order_id') order_id: number, @Param('assigned_to') assigned_to: number): Promise<IFieldData> {
    try {
      return await this.fieldDataService.findAllFieldByWorkOrderid(order_id,assigned_to);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('/field_values/:order_id')
  async getFieldValues(@Param('order_id') order_id: number): Promise<any> {
    try {
      // console.log("order id controller : ",order_id);
      return await this.fieldDataService.getFieldValues(order_id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // @Put('post-error-fields') // Define the route for this method
  // async postErrorFields(@Body() requestBody: { fields: any[], comments: any[] }): Promise<any> {
  //   const { fields, comments } = requestBody;
  //   return this.fieldDataService.postErrorFields(fields, comments);
  // }

  @Get('error_fields/:list')
  async getErrorFields(@Param('list') list: string): Promise<any> {
    const idList: number[] = list.split(',').map(Number);
    return this.fieldDataService.getErrorFields(idList);
  }

}
