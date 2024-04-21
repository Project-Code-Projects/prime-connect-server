import { Table, Column, Model,HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { team } from '../team/team.model';
import { IDepartment } from '../../interfaces/department.interface';

@Table ({
    timestamps: false, // Disable timestamps
    freezeTableName: true, // Prevent table name changes
})
export class department extends Model<IDepartment> {
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
    @HasMany(() => team)
    teams: team[];
}