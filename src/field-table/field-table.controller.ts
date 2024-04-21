import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Bind,
} from '@nestjs/common';
import { PdfDataController } from 'src/pdf-data/pdf-data.controller';
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
}
