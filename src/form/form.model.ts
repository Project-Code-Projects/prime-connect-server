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
  
    @Column({
      type: DataTypes.INTEGER,
      allowNull: false,
    })
    team_id: number;

    @Column({
      type: DataTypes.INTEGER,
      allowNull: false,
    })
    role_id: number;
  
    @Column({
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
     })
    field_id: number[];
  
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