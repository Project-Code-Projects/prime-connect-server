import { Injectable, Inject } from '@nestjs/common';
import { IPdf } from './pdf.interface';
import { Pdf } from './pdf.model';

@Injectable()
export class PdfService {
  constructor() {}
  async addPdf(pdf: IPdf): Promise<any> {
    return await Pdf.create(pdf as any);
  }
  async findAllPdfName(): Promise<any> {
    try {
      const pdfs = await Pdf.findAll();
      // return pdfs.map((pdf: IPdf) => pdf.pdf_name);
      return pdfs;
    } catch (error) {
      throw new Error('Error fetching PDF names');
    }
  }
  async findPdfByName(pdfName: string): Promise<any> {
    try {
      const pdf = await Pdf.findOne({ where: { pdf_name: pdfName } });
      return pdf;
    } catch (error) {
      throw new Error('Error fetching PDF');
    }
  }
}
