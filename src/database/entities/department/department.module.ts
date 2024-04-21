import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { departmentProvider } from './department.providers';
import { DatabaseModule } from '../../database.module';
import { JwtMiddleware } from '../../jwt.middleware';
import { EmployeeLoginService } from '../employee_login/employee_login.service';
import { employeeLoginProvider } from '../employee_login/employee_login.provider';

@Module({
    imports: [DatabaseModule,JwtModule.register({ secret: 'my_secret_key', signOptions: { expiresIn: '12h' } })],
    controllers: [DepartmentController],
    providers: [
      DepartmentService,
      departmentProvider,
      JwtMiddleware,
      EmployeeLoginService,
      employeeLoginProvider
    ],
  })


   export class DepartmentModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(JwtMiddleware).forRoutes(DepartmentController);
    }
  }

  // export class DepartmentModule { }

  // ,JwtModule.register({ secret: 'my_secret_key', signOptions: { expiresIn: '12h' } })

 