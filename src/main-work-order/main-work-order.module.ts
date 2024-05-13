import { Module } from '@nestjs/common';
import { MainWorkOrderService } from './main-work-order.service';
import { DatabaseModule } from 'src/database/database.module';
import { mainWorkOrderProviders } from './main-work-order.providers';
import { MainWorkOrderController } from './main-work-order.controller';
// import { EmployeeRoleModule } from 'src/employee-role/employee-role.module';
import { EmployeeRoleService } from 'src/employee-role/employee-role.service';
import MainWorkOrder from './main-work-order.model';
import { EmployeeService } from 'src/employee/employee.service';
import { employeeProviders } from 'src/employee/employee.providers';
// import { EmployeeModule } from 'src/employee/employee.module';
// import { WorkFlowAssignLogModule } from 'src/workflow-assign-log/workflow-assign-log.module';
import WorkFlowAssignLog from 'src/workflow-assign-log/workflow-assign-log.model';
import { WorkFlowAssignLogService } from 'src/workflow-assign-log/workflow-assign-log.service';
import { workFlowAssignLogProviders } from 'src/workflow-assign-log/workflow-assign-log.providers';
import { CustomerService } from 'src/customer/customer.service';
// import { CustomerModule } from 'src/customer/customer.module';
import { customerProviders } from 'src/customer/customer.providers';
import { TeamRoleService } from '../team_role_workflow/team_role_workflow.service';
import { teamRoleProvider } from '../team_role_workflow/team_role_workflow.provider';
import { fieldDataProviders } from 'src/field-data/field-data.providers';
import { fieldTableProviders } from 'src/field-table/field-table.providers';
import { FieldDataService } from 'src/field-data/field-data.service';
import { FieldTableService } from 'src/field-table/field-table.service';
// import { FieldDataModule } from 'src/field-data/field-data.module';
// import { FieldTableModule } from 'src/field-table/field-table.module';
import { teamFieldProvider } from 'src/team-field/team_field.providers';
import { TeamFieldService } from 'src/team-field/team_field.service';
import { formProvider } from 'src/form/form.provider';
import { FormService } from 'src/form/form.service';
import { formFieldProvider } from 'src/form-field/form-field.provider';
import { FormFieldService } from 'src/form-field/form-field.service';
import { DocubucketService } from 'src/docu-bucket/docu-bucket.service';
import { docuBucketProviders } from 'src/docu-bucket/docu-bucket.providers';
import { PrimaryService } from '../Primary_data/primary.service';
import { primaryProvider } from '../Primary_data/primary.provider';
import { EmployeeStatsService } from 'src/employee_stats/employee_stats.service';
import { employeeStatsProvider } from 'src/employee_stats/employee_stats.provider';
import { WorkflowService } from '../workflow/workflow.service';
import { workflowProvider } from '../workflow/workflow.provider';
import { DistributeWorkOrderService } from 'src/distribute-work-order/distribute-work-order.service';
import { distributeWorkOrderProviders } from 'src/distribute-work-order/distribute-work-order.providers';
// import { DocubucketModule } from 'src/docu-bucket/docu-bucket.module';

@Module({
  imports: [
    DatabaseModule,
    // EmployeeModule,
    // WorkFlowAssignLogModule,
    // FieldDataModule,
    // FieldTableModule,
    // DocubucketModule,
  ],
  controllers: [MainWorkOrderController],
  providers: [
    workflowProvider,
    MainWorkOrderService,
    EmployeeService,
    PrimaryService,
    WorkFlowAssignLogService,
    WorkflowService,
    TeamRoleService,
    FieldDataService,
    FieldTableService,
    TeamFieldService,
    FormService,
    FormFieldService,
    DocubucketService,
    EmployeeStatsService,
    DistributeWorkOrderService,
    CustomerService,
    ...customerProviders,
    employeeStatsProvider,
    primaryProvider,
    ...employeeProviders,
    ...workFlowAssignLogProviders,
    ...mainWorkOrderProviders,
    teamRoleProvider,
    ...fieldDataProviders,
    ...fieldTableProviders,
    ...docuBucketProviders,
    teamFieldProvider,
    formProvider,
    formFieldProvider,
    ...distributeWorkOrderProviders,
  ],
})
export class MainWorkOrderModule {}
