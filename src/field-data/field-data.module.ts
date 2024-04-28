import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { FieldDataController } from './field-data.controller';
import { FieldDataService } from './field-data.service';
import { fieldDataProviders } from './field-data.providers';
import { FieldTableService } from 'src/field-table/field-table.service';
import { fieldTableProviders } from 'src/field-table/field-table.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FieldDataController],
  providers: [FieldDataService, ...fieldDataProviders, FieldTableService, ...fieldTableProviders],
})
export class FieldDataModule {}
