import { Sequelize, Model, Column, Table, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

interface IPdf {
  id: number;
  pdf_values: string[];
}

@Table({
  tableName: 'primary_data',
  timestamps: false,
  freezeTableName: true,
})
export class Primary extends Model<Primary> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataTypes.STRING })
  name: string;

  @Column({ type: DataTypes.STRING })
  nid: string;

  @Column({ type: DataTypes.STRING })
  phone: string;

  @Column({ type: DataTypes.STRING })
  address: string;

  @Column({ type: DataTypes.STRING })
  email: string;

  @Column({ type: DataTypes.STRING })
  tin: string;

  @Column({ type: DataTypes.STRING })
  acc_type: string;

  @Column({ type: DataTypes.INTEGER })
  acc_id: number;

  @Column({ type: DataTypes.INTEGER })
  customer_id: number;

  @Column({ type: DataTypes.INTEGER })
  team_id: number;

  @Column({ type: DataTypes.JSONB })
  pdf: IPdf[];
  // pdf: { name: string, data: Buffer }[];

  @Column({ type: DataTypes.STRING })
  birth_certi: string;

  // Define the one-to-many relationship with AccountList
  // @HasMany(() => AccountList)
  // accountLists!: AccountList[];
}
