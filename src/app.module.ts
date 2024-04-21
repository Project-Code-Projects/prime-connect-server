import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './database/entities/department/department.module';
import { TeamModule } from './database/entities/team/team.module';
import { EmployeeModule } from './database/entities/employee/employee.module';
import { RoleModule } from './database/entities/role/role.module';
import { EmployeeLoginModule } from './database/entities/employee_login/employee_login.module';
import { EmployeeStatsModule } from './database/entities/employee_stats/employee_stats.module';

@Module({
  imports: [ DepartmentModule,TeamModule,EmployeeModule,RoleModule,EmployeeLoginModule,EmployeeStatsModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
