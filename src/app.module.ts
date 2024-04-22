import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerController } from './customer/customer.controller';
import { CustomerModule } from './customer/customer.module';
import { FieldDataModule } from './field-data/field-data.module';
import { FieldTableModule } from './field-table/field-table.module';
import { MainWorkOrderModule } from './main-work-order/main-work-order.module';
import { WorkFlowAssignLogModule } from './workflow-assign-log/workflow-assign-log.module';

import { CustomerService } from './customer/customer.service';
import { EmployeeStatsService } from './employee-stats/employee-stats.service';
import { EmployeeService } from './employee/employee.service';
import { MainWorkOrderService } from './main-work-order/main-work-order.service';
import { WorkFlowAssignLogService } from './workflow-assign-log/workflow-assign-log.service';

import { ScheduleModule } from '@nestjs/schedule';
import { customerProviders } from './customer/customer.providers';
import { DocubucketController } from './docu-bucket/docu-bucket.controller';
import { DocubucketModule } from './docu-bucket/docu-bucket.module';
import { docuBucketProviders } from './docu-bucket/docu-bucket.providers';
import { DocubucketService } from './docu-bucket/docu-bucket.service';
import { EmployeeRoleController } from './employee-role/employee-role.controller';
import { EmployeeRoleModule } from './employee-role/employee-role.module';
import { employeeRoleProviders } from './employee-role/employee-role.providers';
import { EmployeeRoleService } from './employee-role/employee-role.service';
import { EmployeeStatsController } from './employee-stats/employee-stats.controller';
import { employeeStatsProviders } from './employee-stats/employee-stats.providers';
import { EmployeeController } from './employee/employee.controller';
import { employeeProviders } from './employee/employee.providers';
import { FieldDataController } from './field-data/field-data.controller';
import { fieldDataProviders } from './field-data/field-data.providers';
import { FieldDataService } from './field-data/field-data.service';
import { DistributeWorkOrderController } from './distribute-work-order/distribute-work-order.controller';
import { DistributeWorkOrderModule } from './distribute-work-order/distribute-work-order.module';
import { distributeWorkOrderProviders } from './distribute-work-order/distribute-work-order.providers';
import { DistributeWorkOrderService } from './distribute-work-order/distribute-work-order.service';
import { PdfDataController } from './pdf-data/pdf-data.controller';
import { PdfDataModule } from './pdf-data/pdf-data.module';
import { pdfDataProviders } from './pdf-data/pdf-data.providers';
import { PdfDataService } from './pdf-data/pdf-data.service';
import { PdfController } from './pdf/pdf.controller';
import { PdfModule } from './pdf/pdf.module';
import { pdfProviders } from './pdf/pdf.providers';
import { PdfService } from './pdf/pdf.service';
import { MainWorkOrderController } from './main-work-order/main-work-order.controller';
import { mainWorkOrderProviders } from './main-work-order/main-work-order.providers';
import { WorkflowAssignLogController } from './workflow-assign-log/workflow-assign-log.controller';
import { workFlowAssignLogProviders } from './workflow-assign-log/workflow-assign-log.providers';
import { DepartmentModule } from './department/department.module';
import { TeamModule } from './team/team.module';
import { EmployeeModule } from './employee/employee.module';
import { RoleModule } from './role/role.module';
import { EmployeeLoginModule } from './employee_login/employee_login.module';
import { EmployeeStatsModule } from './employee_stats/employee_stats.module';

@Module({
  imports: [
    FieldTableModule,
    FieldDataModule,
    CustomerModule,
    EmployeeModule,
    EmployeeStatsModule,
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

    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
