import { PdfData } from './pdf-data.model';

export const pdfDataProviders = [
  {
    provide: 'PDF_DATA_REPOSITORY',
    useValue: PdfData,
  },
];
