import { Sequelize, Model, Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IFieldTable } from './field-table.interface';

@Table({
  tableName: 'field_table',
  timestamps: true,
  freezeTableName: true,
})
export class FieldTable extends Model<FieldTable> implements IFieldTable {
  @Column({ primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER })
  id: number;

  @Column
  field_name: string;

  @Column
  field_type: string;

  @Column
  estimated_time: number;

  @Column
  page: number;

  @Column({ defaultValue: 0 })
  co_ordinate: number;

  @Column
  sequence: number;

  @Column
  team_id: number;
}

export default FieldTable;
