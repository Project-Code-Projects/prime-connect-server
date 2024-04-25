import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Employee } from '../employee/employee.model';

@Table ({
    tableName: 'employee_login',
    timestamps: false, // Disable timestamps
    freezeTableName: true, // Prevent table name changes
})

export class EmployeeLogin extends Model<EmployeeLogin> {
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
        unique: true
    })
    email: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    password: string;

    @ForeignKey(() => Employee)
    @Column({
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    })
    employee_id: number;
  
    @BelongsTo(() => Employee)
    employee: Employee;
}