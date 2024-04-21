import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Employee } from '../employee/employee.model';

@Table ({
    timestamps: false, // Disable timestamps
    tableName: 'employee_stats',
    freezeTableName: true, // Prevent table name changes
})

export class EmployeeStats extends Model<EmployeeStats> {
    @Column({
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
    })
    id: number;

    @Column({
        type: DataTypes.DATE,
        allowNull: false,
    })
    total_estimated_time: Date;

    @Column({
        type: DataTypes.DATE,
    })
    toal_required_time: Date;

    @Column({
        type: DataTypes.DATE
    })
    time_allotted: Date;

    @Column({
        allowNull: true,
    })
    error_count: number;
        
    @Column({
        allowNull: false,
    })
    role_id: number;

    @Column({
        allowNull: false,
    })
    team_id: number;

    @ForeignKey(() => Employee)
    @Column({
        allowNull: false
    })
    employee_id: number;
  
    @BelongsTo(() => Employee)
    employee: Employee;
}