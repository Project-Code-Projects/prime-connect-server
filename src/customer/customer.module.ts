import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { DatabaseModule } from 'src/database/database.module';
import { CustomerController } from './customer.controller';
import { customerProviders } from './customer.providers';
import { MainWorkOrderModule } from 'src/main-work-order/main-work-order.module';
import { mainWorkOrderProviders } from '../main-work-order/main-work-order.providers';

import { PdfDataModule } from 'src/pdf-data/pdf-data.module';
import { PdfDataService } from 'src/pdf-data/pdf-data.service';
import { pdfDataProviders } from 'src/pdf-data/pdf-data.providers';
import { docuBucketProviders } from 'src/docu-bucket/docu-bucket.providers';
import { DocubucketService } from 'src/docu-bucket/docu-bucket.service';
import { pdfProviders } from 'src/pdf/pdf.providers';
import { PdfService } from 'src/pdf/pdf.service';
import { PdfModule } from 'src/pdf/pdf.module';
import { MainWorkOrderService } from 'src/main-work-order/main-work-order.service';

@Module({
  imports: [DatabaseModule, PdfDataModule, PdfModule, MainWorkOrderModule],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    PdfDataService,
    DocubucketService,
    PdfService,
    MainWorkOrderService,
    ...customerProviders,
    ...pdfDataProviders,
    ...docuBucketProviders,
    ...pdfProviders,
    ...mainWorkOrderProviders,
  ],
})
export class CustomerModule {}
