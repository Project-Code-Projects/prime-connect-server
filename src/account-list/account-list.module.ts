import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AccountListController } from './account-list.controller';
import { accountListProviders } from './account-list.providers';
import { AccountListService } from './account-list.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AccountListController],
  providers: [AccountListService, ...accountListProviders],
})
export class AccountListModule {}
