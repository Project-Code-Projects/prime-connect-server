import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { employeeProvider } from './employee.provider';
import { DatabaseModule } from '../database/database.module';
import { JwtMiddleware } from '../auth/jwt.middleware';
import { EmployeeLoginService } from '../employee_login/employee_login.service';
import { employeeLoginProvider } from '../employee_login/employee_login.provider';
import { TeamService } from '../team/team.service';
import { teamProvider } from '../team/team.provider';
import { RoleService } from '../role/role.service';
import { roleProvider } from '../role/role.provider';
import { TeamRoleService } from 'src/team_role_workflow/team_role_workflow.service';
import { teamRoleProvider } from 'src/team_role_workflow/team_role_workflow.provider';
import { EmployeeStatsService } from 'src/employee-stats/employee-stats.service';
import { employeeStatsProvider } from 'src/employee_stats/employee_stats.provider';
import { DistributeWorkOrderService } from 'src/distribute-work-order/distribute-work-order.service';
import { distributeWorkOrderProviders } from 'src/distribute-work-order/distribute-work-order.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [EmployeeController],
    providers: [
      EmployeeService,
      employeeProvider,
      TeamService,
      teamProvider,
      RoleService,
      roleProvider,
      TeamRoleService,
      teamRoleProvider,
      EmployeeStatsService,
      employeeStatsProvider,

      // DistributeWorkOrderService,
      // ...distributeWorkOrderProviders,
      // JwtMiddleware,
      // EmployeeLoginService,
      // employeeLoginProvider
    ],
  })

  // export class EmployeeModule implements NestModule {
  //   configure(consumer: MiddlewareConsumer) {
  //     consumer
  //       .apply(JwtMiddleware).forRoutes(EmployeeController);
  //   }
  // }

  export class EmployeeModule {}
  // ,JwtModule.register({ secret: 'my_secret_key', signOptions: { expiresIn: '12h' } })
 