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
import { IEmployeeStats } from './employee-stats.interface';

@Table({
  tableName: 'employee_stats',
  timestamps: false, // Disable timestamps
  freezeTableName: true, // Prevent table name changes
})
export class EmployeeStats extends Model<IEmployeeStats> {
  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  workflow_id: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  role_id: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  start_timestamp: Date;

  @Column({
    type: DataTypes.DATE,
  })
  end_timestamp: Date;

  @Column({
    type: DataTypes.STRING,
  })
  time_allotted: string;

  @Column({
    type: DataTypes.STRING,
  })
  error_count: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  employee_id: string;
}
export default EmployeeStats;
