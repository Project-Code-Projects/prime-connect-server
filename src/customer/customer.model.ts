// customer.model.ts

import { Sequelize, Model, Column, Table, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { ICustomer } from './customer.interface';
import { AccountList } from '../account-list/account-list.model'; // Import the AccountList model

@Table({
  tableName: 'customers',
  timestamps: true,
  freezeTableName: true,
})
export class Customer extends Model<ICustomer> implements ICustomer {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column({ unique: true, type: DataTypes.BIGINT })
  nid_no: number;

  @Column({ type: DataTypes.BIGINT })
  phone: number;

  @Column
  address: string;

  @Column
  email: string;

  @Column
  tin_no: string;

  @Column({ type: DataTypes.BIGINT })
  birth_certificate_no: number;

  // Define the one-to-many relationship with AccountList
  @HasMany(() => AccountList)
  accountLists!: AccountList[];
}
