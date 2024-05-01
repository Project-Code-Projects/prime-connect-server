
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
    @Body() updateFieldDataDto: UpdateFieldDataDto,
  ): Promise<void> {
    const { value, order_id, field_id } = updateFieldDataDto;
    return await this.fieldDataService.updateFieldDataByFieldId(value, order_id, field_id);
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


}
