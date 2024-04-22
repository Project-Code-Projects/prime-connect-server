import {
  Sequelize,
  Model,
  Column,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IPdf } from './pdf.interface';
import { TeamPdf } from 'src/team-pdf/team_pdf.model';
import { Team } from 'src/team/team.model';

@Table({
  tableName: 'pdf',
  timestamps: true,
  freezeTableName: true,
})
export class Pdf extends Model<Pdf> implements IPdf {
  @Column({ primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER })
  id: number;
  @Column
  pdf_name: string;
  @Column
  pdf_type: string;

  @BelongsToMany(() => Team, () => TeamPdf)
  teams: Array<Team & { TeamPdf: TeamPdf }>;
}

export default Pdf;
