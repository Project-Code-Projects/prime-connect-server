import { Column, Model, ForeignKey, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Team } from '../team/team.model';
import { Pdf } from '../pdf/pdf.model';

@Table({
  timestamps: false,
  tableName: 'team_pdf',
  freezeTableName: true,
})
export class TeamPdf extends Model<TeamPdf> {
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
    allowNull: false,
  })
  team_id: number;

  @ForeignKey(() => Pdf)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  pdf_id: number;
}
