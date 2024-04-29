import { Column, Model, ForeignKey, BelongsTo, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Form } from '../form/form.model';
import { FieldTable } from '../field-table/field-table.model';
import { Pdf } from '../pdf/pdf.model';

interface Coordinate {
  page: number;
  co_ordinate: [number, number];
}

interface FieldLocation {
  pdf_id: number;
  position: Coordinate[];
}


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



    // @Column({
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   })
    //   page: string;
    
    //   @Column({
    //     type: DataTypes.ARRAY(DataTypes.STRING),
    //     allowNull: false,
    //   })
    //   co_ordinate: string[];
    
      @Column({
        type: DataTypes.STRING,
        allowNull: false,
      })
      sequence: string;

      @Column({
        type: DataTypes.JSONB,
        allowNull: false,
      })
      location: FieldLocation[];

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
    // @Column({
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // })
    // pdf_id: string;
  
    // @BelongsTo(() => Pdf)
    // pdf: Pdf;
}