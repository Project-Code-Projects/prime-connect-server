import {
  Sequelize,
  Model,
  Column,
  Table,
  BelongsToMany,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IFieldTable } from './field-table.interface';
import { Team } from 'src/team/team.model';
import { TeamField } from 'src/team-field/team_field.model';
import { DistributeWorkOrder } from 'src/distribute-work-order/distribute-work-order.model';

@Table({
  tableName: 'field_table',
  timestamps: true,
  freezeTableName: true,
})
export class FieldTable extends Model<FieldTable> implements IFieldTable {
  @Column({ primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER })
  id: number;

  @Column
  field_name: string;

  @Column
  field_type: string;

  @Column
  estimated_time: number;

  @BelongsToMany(() => Team, () => TeamField)
  teams: Array<Team & { TeamField: TeamField }>;
}

export default FieldTable;
