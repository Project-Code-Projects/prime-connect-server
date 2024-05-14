import { Injectable, Inject } from '@nestjs/common';
import { IPdfData } from './pdf-data.interface';
import { PdfData } from './pdf-data.model';

@Injectable()
export class PdfDataService {
  constructor(
    @Inject('PDF_DATA_REPOSITORY')
    private readonly pdfDataModel: typeof PdfData,
  ) {}

  async findAll() {
    return await this.pdfDataModel.findAll();
  }

  async postPdf(pdf: IPdfData): Promise<any> {
    console.log('pdf', pdf);

    return await this.pdfDataModel.create(pdf);
  }
}
