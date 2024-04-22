import { Injectable, Inject } from '@nestjs/common';
import { ICustomer } from './customer.interface';
import { Customer } from './customer.model';
import { IAccountList } from 'src/account-list/account-list.interface';
import { AccountList } from 'src/account-list/account-list.model';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private readonly customerModel: typeof Customer,
    @Inject('ACCOUNT_LIST_REPOSITORY')
    private readonly customerAccountListModel: typeof AccountList,
  ) {}
  async findAllCustomer(): Promise<Customer[]> {
    return this.customerModel.findAll();
  }

  async create(customer: any): Promise<Customer> {
    return this.customerModel.create(customer);
  }
  async findByNid(nid_no: any): Promise<Customer> {
    if (!nid_no) {
      throw new Error('NID number must be provided');
    }
    return this.customerModel.findOne({ where: { nid_no } });
  }
  async findByPhone(phone: number): Promise<Customer> {
    return this.customerModel.findOne({ where: { phone } });
  }
  async createAccList(accList: IAccountList): Promise<AccountList> {
    return this.customerAccountListModel.create(accList);
  }

  async findAllAccList(): Promise<AccountList[]> {
    return this.customerAccountListModel.findAll();
  }
  async findMaxAccId(): Promise<number> {
    return this.customerAccountListModel.max('id');
  }
  async updateAccountList(accId: number, current_state: string): Promise<void> {
    await this.customerAccountListModel.update(
      { current_state },
      { where: { id: accId } },
    );
  }
}
