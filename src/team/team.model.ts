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
import { TeamRole } from '../team_role_workflow/team_role_workflow.model';
import { TeamPdf } from '../team-pdf/team_pdf.model';
import Pdf from '../pdf/pdf.model';
import FieldTable from '../field-table/field-table.model';
import { TeamField } from '../team-field/team_field.model';
import { Form } from '../form/form.model';
import { Workflow } from '../workflow/workflow.model';

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

  @HasMany(() => Form)
  forms: Form[];

  @HasMany(() => Workflow)
  workflows: Workflow[];
}
