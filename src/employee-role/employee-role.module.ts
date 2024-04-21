import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EmployeeRoleController } from './employee-role.controller';
import { employeeRoleProviders } from './employee-role.providers';
import { EmployeeRoleService } from './employee-role.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeRoleController],
  providers: [EmployeeRoleService, ...employeeRoleProviders],
})
export class EmployeeRoleModule {}
