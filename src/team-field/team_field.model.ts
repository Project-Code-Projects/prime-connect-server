import { Column, Model, ForeignKey, Table,BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Team } from '../team/team.model';
import { FieldTable } from '../field-table/field-table.model';
import { Pdf } from '../pdf/pdf.model';

@Table({
  timestamps: false,
  tableName: 'team_field',
  freezeTableName: true,
})
export class TeamField extends Model<TeamField> {
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  page: number;

  @Column({
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  })
  co_ordinate: number[];

  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  })
  sequence: number;

  @ForeignKey(() => Team)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  })
  team_id: number;

  @ForeignKey(() => FieldTable)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  })
  field_id: number;

  
  @ForeignKey(() => Pdf)
  @Column({
    allowNull: false,
  })
  pdf_id: number;

  @BelongsTo(() => Pdf)
  pdf: Pdf;
}
