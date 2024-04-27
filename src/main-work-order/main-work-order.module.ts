import { Module } from '@nestjs/common';
import { MainWorkOrderService } from './main-work-order.service';
import { DatabaseModule } from 'src/database/database.module';
import { mainWorkOrderProviders } from './main-work-order.providers';
import { MainWorkOrderController } from './main-work-order.controller';
import { EmployeeRoleModule } from 'src/employee-role/employee-role.module';
import { EmployeeRoleService } from 'src/employee-role/employee-role.service';
import MainWorkOrder from './main-work-order.model';
import { EmployeeService } from 'src/employee/employee.service';
import { employeeProviders } from 'src/employee/employee.providers';
import { EmployeeModule } from 'src/employee/employee.module';
import { WorkFlowAssignLogModule } from 'src/workflow-assign-log/workflow-assign-log.module';
import WorkFlowAssignLog from 'src/workflow-assign-log/workflow-assign-log.model';
import { WorkFlowAssignLogService } from 'src/workflow-assign-log/workflow-assign-log.service';
import { workFlowAssignLogProviders } from 'src/workflow-assign-log/workflow-assign-log.providers';
import { CustomerService } from 'src/customer/customer.service';
import { CustomerModule } from 'src/customer/customer.module';
import { customerProviders } from 'src/customer/customer.providers';
import { TeamRoleService } from '../team_role_workflow/team_role_workflow.service';
import { teamRoleProvider } from '../team_role_workflow/team_role_workflow.provider';
import { fieldDataProviders } from 'src/field-data/field-data.providers';
import { fieldTableProviders } from 'src/field-table/field-table.providers';
import { FieldDataService } from 'src/field-data/field-data.service';
import { FieldTableService } from 'src/field-table/field-table.service';
import { FieldDataModule } from 'src/field-data/field-data.module';
import { FieldTableModule } from 'src/field-table/field-table.module';
import { teamFieldProvider } from 'src/team-field/team_field.providers';
import { TeamFieldService } from 'src/team-field/team_field.service';
import { formProvider } from 'src/form/form.provider';
import { FormService } from 'src/form/form.service';
import { formFieldProvider } from 'src/form-field/form-field.provider';
import { FormFieldService } from 'src/form-field/form-field.service';

@Module({
  imports: [
    DatabaseModule,
    EmployeeModule,
    WorkFlowAssignLogModule,
    FieldDataModule,
    FieldTableModule,
  ],
  controllers: [MainWorkOrderController],
  providers: [
    MainWorkOrderService,
    EmployeeService,

    WorkFlowAssignLogService,
    TeamRoleService,
    FieldDataService,
    FieldTableService,
    TeamFieldService,
    FormService,
    FormFieldService,

    ...employeeProviders,
    ...workFlowAssignLogProviders,
    ...mainWorkOrderProviders,
    teamRoleProvider,
    ...fieldDataProviders,
    ...fieldTableProviders,
    teamFieldProvider,
    formProvider,
    formFieldProvider,
  ],
})
export class MainWorkOrderModule {}
