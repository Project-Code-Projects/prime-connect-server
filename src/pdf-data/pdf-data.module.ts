import { Module } from '@nestjs/common';
import { PdfDataService } from './pdf-data.service';
import { PdfDataController } from './pdf-data.controller';
import { DatabaseModule } from 'src/database/database.module';
import { pdfDataProviders } from './pdf-data.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PdfDataController],
  providers: [PdfDataService, ...pdfDataProviders],
})
export class PdfDataModule {}
