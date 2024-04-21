import {
  Sequelize,
  Model,
  Column,
  Table,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IMainWorkOrder } from './main-work-order.interface';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { Employee } from '../employee/employee.model';
import { Customer } from 'src/customer/customer.model';

@Table({
  tableName: 'main_work_orders',
  timestamps: true,
  freezeTableName: true,
})
export class MainWorkOrder
  extends Model<IMainWorkOrder>
  implements IMainWorkOrder
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

export default MainWorkOrder;
