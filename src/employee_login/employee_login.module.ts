import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeLoginController } from './employee_login.controller';
import { EmployeeLoginService } from './employee_login.service';
import { employeeLoginProvider } from './employee_login.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule, JwtModule.register({ secret: 'my_secret_key', signOptions: { expiresIn: '12h' } })],
    controllers: [EmployeeLoginController],
    providers: [
      EmployeeLoginService,
      employeeLoginProvider
    ],
  })
  export class EmployeeLoginModule {}

  