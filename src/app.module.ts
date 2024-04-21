import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './department/department.module';
import { TeamModule } from './team/team.module';
import { EmployeeModule } from './employee/employee.module';
import { RoleModule } from './role/role.module';
import { EmployeeLoginModule } from './employee_login/employee_login.module';
import { EmployeeStatsModule } from './employee_stats/employee_stats.module';

@Module({
  imports: [ DepartmentModule,TeamModule,EmployeeModule,RoleModule,EmployeeLoginModule,EmployeeStatsModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
