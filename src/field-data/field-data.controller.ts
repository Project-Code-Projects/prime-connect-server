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
import { IFieldData } from './field-data.interface';
import { FieldDataService } from './field-data.service';
@Controller('field-data')
export class FieldDataController {
  constructor(private readonly fieldDataService: FieldDataService) {}

  @Get()
  async findAllFieldData(): Promise<any> {
    return await this.fieldDataService.findAllFieldData();
  }
}
