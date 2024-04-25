import { Injectable, Inject } from '@nestjs/common';
import { AccountList } from './account-list.model';

@Injectable()
export class AccountListService {
  constructor() {}
  @Inject('ACCOUNT_LIST_REPOSITORY')
  private readonly customerAccountListModel: typeof AccountList;

  async findAllAccList(): Promise<AccountList[]> {
    return this.customerAccountListModel.findAll();
  }
}
