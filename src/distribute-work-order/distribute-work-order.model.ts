import {
  Sequelize,
  Model,
  Column,
  Table,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IDistributeWorkOrder } from './distribute-work-order.interface';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { Employee } from '../employee/employee.model';
import { Customer } from 'src/customer/customer.model';

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
  @Column
  acc_id: number;
  @Column
  status: string | null;
  @Column
  assigned_to: number | null;
  @Column
  start_time: Date | null;

  @Column({ defaultValue: false })
  checked: boolean;

  @Column
  work_order_type: string;

  // @HasMany(() => WorkFlowAssignLog)
  // workflowAssignLogs!: WorkFlowAssignLog[];
  // @BelongsTo(() => Employee, 'assigned_to')
  // assignedEmployee!: Employee;
}

export default DistributeWorkOrder;
