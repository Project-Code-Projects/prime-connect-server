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
import { Team } from '../team/team.model';
import { Role } from '../role/role.model';
import { FormField } from '../form-field/form-field.model';
import FieldTable from '../field-table/field-table.model';
  
  @Table({
    tableName: 'form',
    timestamps: false, // Disable timestamps
    freezeTableName: true, // Prevent table name changes
  })

  export class Form extends Model<Form> {
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
  
    @ForeignKey(() => Team)
    @Column({
      allowNull: false,
    })
    team_id: number;
  
    @BelongsTo(() => Team)
    team: Team;

    @ForeignKey(() => Role)
    @Column({
      allowNull: false,
      unique: true,
    })
    role_id: number;
  
    @BelongsTo(() => Role)
    role: Role;

    @BelongsToMany(() => FieldTable, () => FormField)
    fields: Array<FieldTable & { FormField: FormField }>;
  
    // @Column({
    //     type: DataTypes.ARRAY(DataTypes.INTEGER),
    //     allowNull: true,
    //  })
    // field_id: number[];
  
    // @ForeignKey(() => Department)
    // @Column({
    //   allowNull: false,
    // })
    // dept_id: number;
  
    // @BelongsTo(() => Department)
    // department: Department;
  
    // @BelongsToMany(() => Role, () => TeamRole)
    // roles: Array<Role & { TeamRole: TeamRole }>;
  
    // @BelongsToMany(() => Pdf, () => TeamPdf)
    // pdfs: Array<Pdf & { TeamPdf: TeamPdf }>;
  
    // @BelongsToMany(() => FieldTable, () => TeamField)
    // fields: Array<FieldTable & { TeamField: TeamField }>;
  }