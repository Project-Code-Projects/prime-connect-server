import { Sequelize, Model, Column, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { IPdf } from './pdf.interface';

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
}

export default Pdf;
