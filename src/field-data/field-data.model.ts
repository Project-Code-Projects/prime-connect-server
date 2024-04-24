import {
  Sequelize,
  Model,
  Column,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IFieldData } from './field-data.interface';
import MainWorkOrder from 'src/main-work-order/main-work-order.model';

@Table({
  tableName: 'field_data',
  timestamps: true,
  freezeTableName: true,
})
export class FieldData extends Model<FieldData> implements IFieldData {
  @Column({ primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER })
  id: number;
  @ForeignKey(() => MainWorkOrder)
  @Column
  work_order_id: number;
  @Column
  field_id: number;
  @Column
  value: string | null;
  @Column
  status: string | null;
  @Column
  estimated_time: number;
  @Column
  start_time: Date | null;
  @Column
  err_type: string | null;
  @Column
  err_comment: string | null;
  @Column
  sequence: number;
  @Column
  page: number;
  @Column
  assigned_to: number | null;
}

export default FieldData;
