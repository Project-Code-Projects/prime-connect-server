import { Column, Model, ForeignKey, BelongsTo, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Form } from '../form/form.model';
import { FieldTable } from '../field-table/field-table.model';
import { Pdf } from '../pdf/pdf.model';

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

    @ForeignKey(() => Pdf)
    @Column({
      allowNull: false,
    })
    pdf_id: number;
  
    @BelongsTo(() => Pdf)
    pdf: Pdf;
}