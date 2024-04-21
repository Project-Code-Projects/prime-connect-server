import { Pdf } from './pdf.model';

export const pdfProviders = [
  {
    provide: 'PDF_REPOSITORY',
    useValue: Pdf,
  },
];
