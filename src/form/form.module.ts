import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { formProvider } from './form.provider';
import { DatabaseModule } from '../database/database.module';
import { JwtMiddleware } from '../auth/jwt.middleware';
import { EmployeeLoginService } from '../employee_login/employee_login.service';
import { employeeLoginProvider } from '../employee_login/employee_login.provider';


@Module({
    imports: [DatabaseModule],
    controllers: [FormController],
    providers: [
      FormService,
      formProvider,
      // JwtMiddleware,
      // EmployeeLoginService,
      // employeeLoginProvider
    ],
  })


  //  export class DepartmentModule implements NestModule {
  //   configure(consumer: MiddlewareConsumer) {
  //     consumer
  //       .apply(JwtMiddleware).forRoutes(DepartmentController);
  //   }
  // }

  export class FormModule { }

  // ,JwtModule.register({ secret: 'my_secret_key', signOptions: { expiresIn: '12h' } })