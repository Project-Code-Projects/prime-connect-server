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
        type: DataTypes.STRING,
        allowNull: false,
      })
      page: string;
    
      @Column({
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      })
      co_ordinate: string[];
    
      @Column({
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true
      })
      sequence: string;

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

    // @ForeignKey(() => Pdf)
    @Column({
      type: DataTypes.STRING,
      allowNull: false,
    })
    pdf_id: string;
  
    // @BelongsTo(() => Pdf)
    // pdf: Pdf;
}