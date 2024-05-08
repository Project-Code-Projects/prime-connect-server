import { Column, Model, ForeignKey, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Team } from '../team/team.model';
import { Role } from '../role/role.model';

@Table({
  timestamps: false,
  tableName: 'team_role_workflow',
  freezeTableName: true
})
export class TeamRole extends Model<TeamRole> {

  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
})
id: number;

  @ForeignKey(() => Team)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false
  })
  team_id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false
  })
  role_id: number;
}