import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';

import { FieldTableService } from './field-table.service';
import { FieldTableController } from './field-table.controller';
import { fieldTableProviders } from './field-table.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FieldTableController],
  providers: [FieldTableService, ...fieldTableProviders],
})
export class FieldTableModule {}
