import { Column, Model, ForeignKey, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Form } from '../form/form.model';
import { FieldTable } from '../field-table/field-table.model';

@Table({
    tableName: 'form_field',
    timestamps: false,
    freezeTableName: true,
})

export class FormField extends Model<FormField> {
    @Column({
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
    })
    id: number;

    @ForeignKey(() => Form)
    @Column({
      type: DataTypes.INTEGER,
      allowNull: false
    })
    form_id: number;
  
    @ForeignKey(() => FieldTable)
    @Column({
      type: DataTypes.INTEGER,
      allowNull: false
    })
    field_id: number;
}