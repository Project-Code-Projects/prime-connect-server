import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFiles,
  UseInterceptors,
  Bind,
} from '@nestjs/common';
import { PdfDataService } from './pdf-data.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { convertPDFBufferToImagesAndUpload } from './pdf.middleware';
import { IPdfData } from './pdf-data.interface';
@Controller('pdf-data')
export class PdfDataController {
  constructor(private readonly pdfService: PdfDataService) {}

  @Get()
  async getPdf(): Promise<any> {
    return await this.pdfService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  @Bind(UploadedFiles())
  async uploadFile(files) {
    const pdf1 = await convertPDFBufferToImagesAndUpload(files[0].buffer); // this gives the array with the image link
    const pdf2 = await convertPDFBufferToImagesAndUpload(files[1].buffer); // this gives the array with the image link
    const pdf3 = await convertPDFBufferToImagesAndUpload(files[2].buffer); // this gives the array with the image link
    const pdf4 = await convertPDFBufferToImagesAndUpload(files[3].buffer); // this gives the array with the image link
    const pdfData: IPdfData = {
      customer_id: 1,
      acc_id: 1,
      pdf_1: pdf1,
      pdf_2: pdf2,
      pdf_3: pdf3,
      pdf_4: pdf4,
    };
    this.pdfService.postPdf(pdfData);
  }
  // @Post()
  // async postPdf(@Body() body: any): Promise<any> {
  //   await this.pdfService.postPdf(body);
  //   return body;
  // }
}
