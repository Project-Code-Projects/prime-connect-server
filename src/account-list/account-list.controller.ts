import { AccountList } from './account-list.model';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

@Controller('account-list')
export class AccountListController {
  constructor() {}

  @Get()
  async findAllAccList(): Promise<AccountList[]> {
    return AccountList.findAll();
  }
}
