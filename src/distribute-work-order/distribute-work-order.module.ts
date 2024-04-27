import { Module } from '@nestjs/common';
import { DistributeWorkOrderService } from './distribute-work-order.service';
import { DatabaseModule } from 'src/database/database.module';
import { distributeWorkOrderProviders } from './distribute-work-order.providers';
import { DistributeWorkOrderController } from './distribute-work-order.controller';
import { EmployeeRoleModule } from 'src/employee-role/employee-role.module';
import { EmployeeRoleService } from 'src/employee-role/employee-role.service';
import { MainWorkOrder } from 'src/main-work-order/main-work-order.model';
import { mainWorkOrderProviders } from 'src/main-work-order/main-work-order.providers';
import { MainWorkOrderService } from 'src/main-work-order/main-work-order.service';
import { teamRoleProvider } from '../team_role_workflow/team_role_workflow.provider';
import { TeamRoleService } from '../team_role_workflow/team_role_workflow.service';
import { employeeProvider } from 'src/employee/employee.provider';
import { fieldDataProviders } from 'src/field-data/field-data.providers';
import { FieldDataService } from 'src/field-data/field-data.service';
import { accountListProviders } from 'src/account-list/account-list.providers';
import { EmployeeService } from 'src/employee/employee.service';
import { AccountListService } from 'src/account-list/account-list.service';
import { fieldTableProviders } from 'src/field-table/field-table.providers';
import { FieldTableService } from 'src/field-table/field-table.service';
import { teamFieldProvider } from 'src/team-field/team_field.providers';
import { TeamFieldService } from 'src/team-field/team_field.service';
import { workFlowAssignLogProviders } from 'src/workflow-assign-log/workflow-assign-log.providers';
import { WorkFlowAssignLogService } from 'src/workflow-assign-log/workflow-assign-log.service';
import { formProvider } from 'src/form/form.provider';
import { FormService } from 'src/form/form.service';
import { formFieldProvider } from 'src/form-field/form-field.provider';
import { FormFieldService } from 'src/form-field/form-field.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DistributeWorkOrderController],
  providers: [
    DistributeWorkOrderService,
    TeamRoleService,
    EmployeeRoleService,
    FieldDataService,
    EmployeeService,
    AccountListService,
    MainWorkOrderService,
    FieldTableService,
    TeamFieldService,
    WorkFlowAssignLogService,
    FormService,
    FormFieldService,
    ...distributeWorkOrderProviders,
    teamRoleProvider,
    employeeProvider,
    ...fieldDataProviders,
    employeeProvider,
    ...accountListProviders,
    ...mainWorkOrderProviders,
    ...fieldTableProviders,
    teamFieldProvider,
    ...workFlowAssignLogProviders,
    formProvider,
    formFieldProvider,
  ],
})
export class DistributeWorkOrderModule {}
