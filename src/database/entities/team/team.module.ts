import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { teamProvider } from './team.provider';
import { DatabaseModule } from '../../database.module';
import { JwtMiddleware } from '../../jwt.middleware';
import { EmployeeLoginService } from '../employee_login/employee_login.service';
import { employeeLoginProvider } from '../employee_login/employee_login.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [TeamController],
    providers: [
      TeamService,
      teamProvider,
      // JwtMiddleware,
      // EmployeeLoginService,
      // employeeLoginProvider
    ],
  })

  //   export class TeamModule implements NestModule {
  //   configure(consumer: MiddlewareConsumer) {
  //     consumer
  //       .apply(JwtMiddleware).forRoutes(TeamController);
  //   }
  // }

  export class TeamModule {}
  // ,JwtModule.register({ secret: 'my_secret_key', signOptions: { expiresIn: '12h' } })
