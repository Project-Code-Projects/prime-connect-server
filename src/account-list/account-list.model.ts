// account-list.model.ts

import {
  Sequelize,
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IAccountList } from './account-list.interface';
import { Customer } from 'src/customer/customer.model'; // Import the Customer model

@Table({
  tableName: 'account_list',
  timestamps: true,
  freezeTableName: true,
})
export class AccountList extends Model<IAccountList> implements IAccountList {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Customer)
  @Column
  customer_id: number;

  // Define the association with Customer
  @BelongsTo(() => Customer)
  customer!: Customer;

  @Column
  acc_type: string;

  @Column
  status: string;

  @Column
  current_state: string;
}
