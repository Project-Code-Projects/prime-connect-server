import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Department } from '../department/department.model';
import { Role } from '../role/role.model';
import { TeamRole } from '../team_role/team_role.model';
import { TeamPdf } from '../team-pdf/team_pdf.model';
import Pdf from '../pdf/pdf.model';
import FieldTable from '../field-table/field-table.model';
import { TeamField } from '../team-field/team_field.model';

@Table({
  tableName: 'team',
  timestamps: false, // Disable timestamps
  freezeTableName: true, // Prevent table name changes
})
export class Team extends Model<Team> {
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
    type: DataTypes.STRING,
    allowNull: false,
  })
  description: string;

  //   @Column({
  //     type: DataTypes.ARRAY(DataTypes.STRING),
  //     allowNull: true,
  //   })
  //   required_pdf: string[];

  @ForeignKey(() => Department)
  @Column({
    allowNull: false,
  })
  dept_id: number;

  @BelongsTo(() => Department)
  department: Department;

  @BelongsToMany(() => Role, () => TeamRole)
  roles: Array<Role & { TeamRole: TeamRole }>;

  @BelongsToMany(() => Pdf, () => TeamPdf)
  pdfs: Array<Pdf & { TeamPdf: TeamPdf }>;

  @BelongsToMany(() => FieldTable, () => TeamField)
  fields: Array<FieldTable & { TeamField: TeamField }>;
}
