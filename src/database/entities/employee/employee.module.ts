import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { employeeProvider } from './employee.provider';
import { DatabaseModule } from '../../database.module';
import { JwtMiddleware } from '../../jwt.middleware';
import { EmployeeLoginService } from '../employee_login/employee_login.service';
import { employeeLoginProvider } from '../employee_login/employee_login.provider';
import { TeamService } from '../team/team.service';
import { teamProvider } from '../team/team.provider';
import { RoleService } from '../role/role.service';
import { roleProvider } from '../role/role.provider';

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
 