import { Column, Model, Table, ForeignKey, BelongsTo, HasMany , BelongsToMany} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Team } from '../team/team.model';
import { Employee } from '../employee/employee.model';
import { TeamRole } from '../team_role/team_role.model';

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


    // @ForeignKey(() => Team)
    // @Column({
    //     allowNull: false
    // })
    // team_id: number;
  
    // @BelongsTo(() => Team)
    // team: Team;

    @BelongsToMany(() => Team, () => TeamRole)
    teams: Array<Team & {TeamRole: TeamRole}>;
  
    @HasMany(() => Employee)
    employees: Employee[];
}   