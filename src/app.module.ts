import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { FieldDataModule } from './field-data/field-data.module';
import { FieldTableModule } from './field-table/field-table.module';
import { MainWorkOrderModule } from './main-work-order/main-work-order.module';
import { WorkFlowAssignLogModule } from './workflow-assign-log/workflow-assign-log.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DocubucketModule } from './docu-bucket/docu-bucket.module';
import { EmployeeRoleModule } from './employee-role/employee-role.module';
import { DistributeWorkOrderModule } from './distribute-work-order/distribute-work-order.module';
import { PdfDataModule } from './pdf-data/pdf-data.module';
import { PdfModule } from './pdf/pdf.module';
import { DepartmentModule } from './department/department.module';
import { TeamModule } from './team/team.module';
import { EmployeeModule } from './employee/employee.module';
import { RoleModule } from './role/role.module';
import { EmployeeLoginModule } from './employee_login/employee_login.module';
import { EmployeeStatsModule } from './employee_stats/employee_stats.module';
import { AccountListModule } from './account-list/account-list.module';
import { FormModule } from './form/form.module';
import { WorkflowModule } from './workflow/workflow.module';

@Module({
  imports: [
    FieldTableModule,
    FieldDataModule,
    CustomerModule,
    EmployeeModule,
    WorkFlowAssignLogModule,
    MainWorkOrderModule,
    PdfDataModule,
    EmployeeRoleModule,
    DocubucketModule,
    PdfModule,
    DistributeWorkOrderModule,
    DepartmentModule,
    TeamModule,
    EmployeeModule,
    RoleModule,
    EmployeeLoginModule,
    EmployeeStatsModule,
    AccountListModule,
    FormModule,
    WorkflowModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
