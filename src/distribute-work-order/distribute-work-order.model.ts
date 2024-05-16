import {
  Sequelize,
  Model,
  Column,
  Table,
  HasMany,
  BelongsTo,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IDistributeWorkOrder } from './distribute-work-order.interface';
import FieldTable from 'src/field-table/field-table.model';
import MainWorkOrder from 'src/main-work-order/main-work-order.model';
import { Employee } from 'src/employee/employee.model';

@Table({
  tableName: 'distribute_work_orders',
  timestamps: true,
  freezeTableName: true,
})
export class DistributeWorkOrder
  extends Model<IDistributeWorkOrder>
  implements IDistributeWorkOrder
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER })
  id: number;

  @ForeignKey(() => MainWorkOrder)
  @Column
  work_order_id: number;
  @BelongsTo(() => MainWorkOrder)
  mainWorkOrder!: MainWorkOrder;

  @Column(DataTypes.ARRAY(DataTypes.INTEGER))
  field_id: number[];

  @ForeignKey(() => Employee)
  @Column
  assigned_to: number | null;
  @BelongsTo(() => Employee)
  assignedEmployee!: Employee;

  @Column
  estimated_time: number | null;

  @Column
  status: string | null;

  // @HasMany(() => WorkFlowAssignLog)
  // workflowAssignLogs!: WorkFlowAssignLog[];
  // @BelongsTo(() => Employee, 'assigned_to')
  // assignedEmployee!: Employee;
}
