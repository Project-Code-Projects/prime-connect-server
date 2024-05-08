import { Column, Model, ForeignKey, Table,BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Team } from '../team/team.model';
import { Role } from '../role/role.model';

@Table({
tableName: 'workflow',
  timestamps: false,
  freezeTableName: true
})
export class Workflow extends Model<Workflow> {

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
 access: string;
 
 @Column({
   type: DataTypes.BOOLEAN,
   allowNull: true,
  })
  isAuthor: boolean;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
 })
 sequence: number;

  @ForeignKey(() => Team)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false
  })
  team_id: number;

  @BelongsTo(() => Team)
  team: Team;

  @ForeignKey(() => Role)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false
  })
  role_id: number;

  @BelongsTo(() => Role)
  role: Role;
}