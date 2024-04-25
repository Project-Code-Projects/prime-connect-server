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
import { UpdateFieldDataDto } from './field-data.dto';
@Controller('field-data')
export class FieldDataController {
  constructor(private readonly fieldDataService: FieldDataService) {}

  @Get()
  async findAllFieldData(): Promise<any> {
    return await this.fieldDataService.findAllFieldData();
  }

  @Post('update')
  async updateFieldData(
    @Body() updateFieldDataDto: UpdateFieldDataDto,
  ): Promise<void> {
    const { id, value } = updateFieldDataDto;
    return await this.fieldDataService.updateFieldDataByFieldId(id, value);
  }
}
