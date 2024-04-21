import { Sequelize } from 'sequelize-typescript';
import { Department } from '../department/department.model';
import { Team } from '../team/team.model';
import { Role } from '../role/role.model';
import { Employee } from '../employee/employee.model';
import { EmployeeLogin } from '../employee_login/employee_login.model';
import { EmployeeStats } from '../employee_stats/employee_stats.model';
import { TeamRole } from '../team_role/team_role.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'ep-wild-cell-a2u0265d.eu-central-1.pg.koyeb.app',
        // host: 'localhost',
        port: 5432,
        username: 'koyeb-adm',
        // username: 'postgres',
        password: '7fWnr6JZyUXe',
        // password: 'bsc16190',
        database: 'koyebdb',
        // database: 'admin',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });
      sequelize.addModels([
        Department,
        Team,
        Role,
        Employee,
        EmployeeLogin,
        EmployeeStats,
        TeamRole
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
