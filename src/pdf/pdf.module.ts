import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { PdfController } from './pdf.controller';
import { PdfService } from './pdf.service';
import { pdfProviders } from './pdf.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PdfController],
  providers: [PdfService, ...pdfProviders],
})
export class PdfModule {}
