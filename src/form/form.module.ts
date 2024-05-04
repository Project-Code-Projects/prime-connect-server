import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { FormController } from './form.controller';
import { FormService } from './form.service';
import { formProvider } from './form.provider';
import { DatabaseModule } from '../database/database.module';
import {FieldTableService } from '../field-table/field-table.service';
import { FormFieldService } from '../form-field/form-field.service';
import { fieldTableProviders } from '../field-table/field-table.providers';
import { formFieldProvider } from '../form-field/form-field.provider';
import { JwtMiddleware } from '../auth/jwt.middleware';
import { EmployeeLoginService } from '../employee_login/employee_login.service';
import { employeeLoginProvider } from '../employee_login/employee_login.provider';
import { DocubucketService } from 'src/docu-bucket/docu-bucket.service';
import { docuBucketProviders } from 'src/docu-bucket/docu-bucket.providers';


@Module({
    imports: [DatabaseModule],
    controllers: [FormController],
    providers: [
      FormService,
      formProvider,
      FieldTableService,
      FormFieldService,
      formFieldProvider,
      DocubucketService,
      ...fieldTableProviders,
      ...docuBucketProviders,
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