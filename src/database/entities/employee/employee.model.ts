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
import { role } from '../role/role.model';
import { employee_login } from '../employee_login/employee_login.model';
import { employee_stats } from '../employee_stats/employee_stats.model';

@Table({
  timestamps: false, // Disable timestamps
  freezeTableName: true, // Prevent table name changes
})
export class employee extends Model<employee> {
  @Column({
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

  @ForeignKey(() => role)
 @Column({
  allowNull: false,
 })
role_id: number;

  @BelongsTo(() => role)
  role: role;

  @HasOne(() => employee_login)
  login: employee_login;

  @HasMany(() => employee_stats)
  statusLogs: employee_stats[];
}
