import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { roleProvider } from './role.provider';
import { DatabaseModule } from '../../database.module';
import { JwtMiddleware } from '../../jwt.middleware';
import { EmployeeLoginService } from '../employee_login/employee_login.service';
import { employeeLoginProvider } from '../employee_login/employee_login.provider';
import { EmployeeService } from '../employee/employee.service';
import { employeeProvider } from '../employee/employee.provider';
import { TeamRoleService } from '../team_role/team_role.service';
import { teamRoleProvider } from '../team_role/team_role.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [RoleController],
    providers: [
      RoleService,
      teamRoleProvider,
      TeamRoleService,
      roleProvider,
      // JwtMiddleware,
      // EmployeeLoginService,
      // employeeLoginProvider,
      EmployeeService,
      employeeProvider
    ],
  })

  //  export class RoleModule implements NestModule {
  //   configure(consumer: MiddlewareConsumer) {
  //     consumer
  //       .apply(JwtMiddleware).forRoutes(RoleController);
  //   }
  // }

  export class RoleModule {  }
  // ,JwtModule.register({ secret: 'my_secret_key', signOptions: { expiresIn: '12h' } })
 