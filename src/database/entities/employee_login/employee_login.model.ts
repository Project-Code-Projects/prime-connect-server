import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { employee } from '../employee/employee.model';

@Table ({
    timestamps: false, // Disable timestamps
    freezeTableName: true, // Prevent table name changes
})

export class employee_login extends Model<employee_login> {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
    })
    id: number;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    })
    email: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    password: string;

    @ForeignKey(() => employee)
    @Column({
        allowNull: false
    })
    employee_id: number;
  
    @BelongsTo(() => employee)
    employee: employee;
}