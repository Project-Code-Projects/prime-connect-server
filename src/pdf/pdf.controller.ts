import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Bind,
} from '@nestjs/common';
import { PdfDataController } from '../pdf-data/pdf-data.controller';
import { IPdf } from './pdf.interface';
import { PdfService } from './pdf.service';
@Controller('/pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  async addPdf(@Body() pdf: IPdf): Promise<any> {
    await this.pdfService.addPdf(pdf);
    return this.pdfService.findAllPdfName();
  }

  @Get()
  async findAllPdfName(): Promise<any> {
    return await this.pdfService.findAllPdfName();
  }
}
