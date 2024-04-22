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
import { DistributeWorkOrder } from 'src/distribute-work-order/distribute-work-order.model';
import { ForeignKey } from 'sequelize-typescript';

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
  customer_id: number;

  @Column
  acc_type: string;
  @Column
  status: string | null;
  @Column
  assigned_to: number | null;
  @Column
  start_time: Date | null;

  @Column({ defaultValue: false })
  isAssigned: boolean;

  @HasMany(() => DistributeWorkOrder)
  distributeWorkOrders!: DistributeWorkOrder[];
  // workflowAssignLogs!: WorkFlowAssignLog[];
  // @BelongsTo(() => Employee, 'assigned_to')
  // assignedEmployee!: Employee;
}

export default MainWorkOrder;
