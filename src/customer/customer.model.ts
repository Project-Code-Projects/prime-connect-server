import { Sequelize, Model, Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { ICustomer, ICustomerAccountNo } from './customer.interface';

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
}

@Table({
  tableName: 'account_list',
  timestamps: true,
  freezeTableName: true,
})
export class CustomerAccountList
  extends Model<ICustomerAccountNo>
  implements ICustomerAccountNo
{
  @Column({ primaryKey: true, autoIncrement: true })
  id: number | null;
  @Column
  acc_id: number;
  @Column
  customer_id: number;
  @Column
  acc_type: string;
  @Column
  status: string;
  @Column
  current_state: string;
}

export default { Customer, CustomerAccountList };
