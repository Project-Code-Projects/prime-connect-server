import {
  Sequelize,
  Model,
  Column,
  Table,
  ForeignKey,
  DataType,
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
  static bulkUpdate(
    updateData: {
      where: { id: any };
      data: { err_type: string; err_comment: any };
    }[],
  ) {
    throw new Error('Method not implemented.');
  }

  @Column({
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    type: DataTypes.INTEGER,
  })
  id?: number;
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
  assigned_time: Date | null;
  @Column({ type: DataTypes.STRING })
  err_type: string | null;
  @Column
  err_comment: string | null;
  @Column
  sequence: number;
  @Column
  page: number;
  @Column
  assigned_to: number | null;
  @Column
  time_interval: number | null;
  @Column(DataType.ARRAY(DataType.INTEGER))
  prev_assigned: number[] | [];
}

export default FieldData;
