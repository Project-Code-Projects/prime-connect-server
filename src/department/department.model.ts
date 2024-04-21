import { Table, Column, Model,HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Team } from '../team/team.model';
import { IDepartment } from './department.interface';

@Table ({
    timestamps: false, // Disable timestamps
    tableName: 'department',
    freezeTableName: true, // Prevent table name changes
})
export class Department extends Model<IDepartment> {
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
    })
    name: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    description: string;
    @HasMany(() => Team)
    teams: Team[];
}