import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Bind,
  Param,
} from '@nestjs/common';
import { PdfDataController } from '../pdf-data/pdf-data.controller';
import { IFieldTable } from './field-table.interface';
import { FieldTableService } from './field-table.service';
@Controller('field-table')
export class FieldTableController {
  constructor(private readonly fieldTableService: FieldTableService) {}

  @Post()
  async addFieldTable(@Body() fieldTable: IFieldTable): Promise<any> {
    return await this.fieldTableService.addFieldTable(fieldTable);
  }
  @Get()
  async findAllFieldTable(): Promise<any> {
    return await this.fieldTableService.findAllFieldTable();
  }

  @Get('/:id')	
  async findFieldById(@Param('id') id: number): Promise<any> {
    return await this.fieldTableService.findFieldById(id);
  }

}
