import { Sequelize, Model, Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IPdfData } from './pdf-data.interface';

@Table({
  tableName: 'pdf_data',
  timestamps: true,
  freezeTableName: true,
})
export class PdfData extends Model<PdfData> implements IPdfData {
  @Column({ primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER })
  id: number;
  @Column
  acc_id: number;
  @Column
  customer_id: number;
  @Column(DataTypes.ARRAY(DataTypes.STRING)) // Adjust column type for array of strings
  pdf_1: string[];

  @Column(DataTypes.ARRAY(DataTypes.STRING)) // Adjust column type for array of strings
  pdf_2: string[];

  @Column(DataTypes.ARRAY(DataTypes.STRING)) // Adjust column type for array of strings
  pdf_3: string[];

  @Column(DataTypes.ARRAY(DataTypes.STRING)) // Adjust column type for array of strings
  pdf_4: string[];
}

export default PdfData;
