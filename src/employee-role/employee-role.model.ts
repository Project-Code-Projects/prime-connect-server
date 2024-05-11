import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IEmployeeRole } from './employee-role.interface';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
@Table({
  tableName: 'employee_role',
  timestamps: false, // Disable timestamps
  freezeTableName: true, // Prevent table name changes
})
export class EmployeeRole extends Model<IEmployeeRole> {
  @Column({
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  })
  description: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  })
  team_id: string;
  // @HasMany(() => WorkFlowAssignLog)
  // workflowAssignLogs!: WorkFlowAssignLog[];
}
export default EmployeeRole;
