import { Column, Model, Table, ForeignKey, BelongsTo, HasOne, HasMany , BelongsToMany} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Team } from '../team/team.model';
import { Employee } from '../employee/employee.model';
import { TeamRole } from '../team_role_workflow/team_role_workflow.model';
import { Form } from '../form/form.model';
import {Workflow } from '../workflow/workflow.model';

@Table ({
    timestamps: false, // Disable timestamps
    tableName: 'role',
    freezeTableName: true, // Prevent table name changes
})
export class Role extends Model<Role> {
    @Column({
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: true,
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

    @BelongsToMany(() => Team, () => TeamRole)
    teams: Array<Team & {TeamRole: TeamRole}>;

    @HasOne(() => Form)
    form: Form;
  
    @HasMany(() => Employee)
    employees: Employee[];
    @HasMany(() => Workflow)
    workflows: Workflow[];
}   