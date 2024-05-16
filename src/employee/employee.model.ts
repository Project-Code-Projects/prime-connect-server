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
import { Role } from '../role/role.model';
import { EmployeeLogin } from '../employee_login/employee_login.model';
import { EmployeeStats } from '../employee_stats/employee_stats.model';
import MainWorkOrder from '../main-work-order/main-work-order.model';
import { DistributeWorkOrder } from 'src/distribute-work-order/distribute-work-order.model';

@Table({
  timestamps: false, // Disable timestamps
  tableName: 'employee',
  freezeTableName: true, // Prevent table name changes
})
export class Employee extends Model<Employee> {
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  age: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
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
    type: DataTypes.STRING,
    allowNull: false,
  })
  admin: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  profile_pic: string;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  team_id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;

  @HasOne(() => EmployeeLogin)
  login: EmployeeLogin;

  @HasMany(() => EmployeeStats)
  statusLogs: EmployeeStats[];

  @HasMany(() => MainWorkOrder)
  mEmployee: MainWorkOrder[];
  @HasMany(() => DistributeWorkOrder)
  dEmployee: DistributeWorkOrder[];
}
