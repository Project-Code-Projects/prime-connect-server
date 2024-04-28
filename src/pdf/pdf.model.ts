import {
  Sequelize,
  Model,
  Column,
  Table,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IPdf } from './pdf.interface';
import { TeamPdf } from '../team-pdf/team_pdf.model';
import { Team } from '../team/team.model';
import { FormField } from '../form-field/form-field.model';
import { TeamField } from '../team-field/team_field.model';

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

  // @HasMany(() => FormField)
  // formFields: FormField[];

  @HasMany(() => TeamField)
   teamFields: TeamField[];
}

export default Pdf;
