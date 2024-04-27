import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { DatabaseModule } from '../database/database.module';
import { CustomerController } from './customer.controller';
import { customerProviders } from './customer.providers';
import { MainWorkOrderModule } from '../main-work-order/main-work-order.module';
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
import { teamRoleProvider } from '../team_role_workflow/team_role_workflow.provider';
import { TeamRoleService } from '../team_role_workflow/team_role_workflow.service';
import { fieldDataProviders } from 'src/field-data/field-data.providers';
import { FieldDataService } from 'src/field-data/field-data.service';
import { fieldTableProviders } from 'src/field-table/field-table.providers';
import { FieldTableService } from 'src/field-table/field-table.service';
import { teamFieldProvider } from 'src/team-field/team_field.providers';
import { TeamFieldService } from 'src/team-field/team_field.service';
import { formProvider } from 'src/form/form.provider';
import { formFieldProvider } from 'src/form-field/form-field.provider';
import { FormFieldService } from 'src/form-field/form-field.service';
import { FormService } from 'src/form/form.service';

@Module({
  imports: [DatabaseModule, PdfDataModule, PdfModule, MainWorkOrderModule],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    PdfDataService,
    DocubucketService,
    PdfService,
    MainWorkOrderService,
    TeamRoleService,
    FieldDataService,
    FieldTableService,
    TeamFieldService,
    FormService,
    FormFieldService,
    ...customerProviders,
    ...pdfDataProviders,
    ...docuBucketProviders,
    ...pdfProviders,
    ...mainWorkOrderProviders,
    teamRoleProvider,
    ...fieldDataProviders,
    ...fieldTableProviders,
    teamFieldProvider,
    formProvider,
    formFieldProvider,
  ],
})
export class CustomerModule {}
