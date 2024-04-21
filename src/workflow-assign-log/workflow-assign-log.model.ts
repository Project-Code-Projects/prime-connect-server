import {
  Sequelize,
  Model,
  Column,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IWorkFlowAssignLog } from './workflow-assign-log.interface';

import { EmployeeRole } from '../employee-role/employee-role.model';
import { Employee } from '../employee/employee.model';

@Table({
  tableName: 'workflow_assign_log',
  timestamps: true,
  freezeTableName: true,
})
export class WorkFlowAssignLog
  extends Model<IWorkFlowAssignLog>
  implements IWorkFlowAssignLog
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER })
  id: number;

  // @ForeignKey(() => WorkOrder)
  @Column
  work_order_id: number;

  @Column
  field_data_id: number | null;

  @ForeignKey(() => Employee)
  @Column
  assigned_to: number;

  @BelongsTo(() => Employee)
  employee!: Employee;
}

export default WorkFlowAssignLog;
