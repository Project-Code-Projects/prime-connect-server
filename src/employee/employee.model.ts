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
import { IEmployee } from './employee.interface';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { EmployeeRole } from '../employee-role/employee-role.model';

@Table({
  tableName: 'employee',
  timestamps: false, // Disable timestamps
  freezeTableName: true, // Prevent table name changes
})
export class Employee extends Model<IEmployee> {
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
    unique: true,
  })
  email: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  })
  phone: string;

  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: false,
  })
  active: boolean;

  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: false,
  })
  admin: boolean;
  @Column
  team_id: number;

  @Column
  role_id: number;
  @HasMany(() => WorkFlowAssignLog)
  workflowAssignLogs!: WorkFlowAssignLog[];
}
export default Employee;
