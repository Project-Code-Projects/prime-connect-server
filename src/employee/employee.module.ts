import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { employeeProvider } from './employee.provider';
import { DatabaseModule } from '../database/database.module';
import { JwtMiddleware } from '../auth/jwt.middleware';
import { EmployeeLoginService } from '../employee_login/employee_login.service';
import { employeeLoginProvider } from '../employee_login/employee_login.provider';
import { TeamService } from '../team/team.service';
import { teamProvider } from '../team/team.provider';
import { RoleService } from '../role/role.service';
import { roleProvider } from '../role/role.provider';
import { TeamRoleService } from 'src/team_role_workflow/team_role_workflow.service';
import { teamRoleProvider } from 'src/team_role_workflow/team_role_workflow.provider';
import { EmployeeStatsService } from 'src/employee_stats/employee_stats.service';
import { employeeStatsProvider } from 'src/employee_stats/employee_stats.provider';
import { DistributeWorkOrderService } from 'src/distribute-work-order/distribute-work-order.service';
import { distributeWorkOrderProviders } from 'src/distribute-work-order/distribute-work-order.providers';
import { WorkflowService } from '../workflow/workflow.service';
import { workflowProvider } from '../workflow/workflow.provider';
import { FieldDataService } from 'src/field-data/field-data.service';
import { fieldDataProviders } from 'src/field-data/field-data.providers';
import { fieldTableProviders } from '../field-table/field-table.providers';
import { FieldTableService } from 'src/field-table/field-table.service';
import { AccountListService } from 'src/account-list/account-list.service';
import { accountListProviders } from '../account-list/account-list.providers';
import { MainWorkOrderService } from 'src/main-work-order/main-work-order.service';
import { mainWorkOrderProviders } from 'src/main-work-order/main-work-order.providers';
import { TeamFieldService } from 'src/team-field/team_field.service';
import { teamFieldProvider } from 'src/team-field/team_field.providers';
import { FormService } from 'src/form/form.service';
import { formProvider } from 'src/form/form.provider';
import { FormFieldService } from 'src/form-field/form-field.service';
import { formFieldProvider } from 'src/form-field/form-field.provider';
import { DocubucketService } from 'src/docu-bucket/docu-bucket.service';
import { docuBucketProviders } from 'src/docu-bucket/docu-bucket.providers';
import { CustomerService } from 'src/customer/customer.service';
import { customerProviders } from 'src/customer/customer.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    DistributeWorkOrderService,
    ...distributeWorkOrderProviders,
    employeeProvider,
    TeamService,
    teamProvider,
    RoleService,
    roleProvider,
    TeamRoleService,
    teamRoleProvider,
    EmployeeStatsService,
    employeeStatsProvider,
    WorkflowService,
    workflowProvider,
    FieldDataService,
    ...fieldDataProviders,
    ...fieldTableProviders,
    FieldTableService,
    AccountListService,
    ...accountListProviders,
    MainWorkOrderService,
    ...mainWorkOrderProviders,
    TeamFieldService,
    teamFieldProvider,
    FormService,
    formProvider,
    FormFieldService,
    formFieldProvider,
    DocubucketService,
    ...docuBucketProviders,
    CustomerService,
    ...customerProviders,

    // DistributeWorkOrderService,
    // ...distributeWorkOrderProviders,
    // JwtMiddleware,
    // EmployeeLoginService,
    // employeeLoginProvider
  ],
})

// export class EmployeeModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(JwtMiddleware).forRoutes(EmployeeController);
//   }
// }
export class EmployeeModule {}
// ,JwtModule.register({ secret: 'my_secret_key', signOptions: { expiresIn: '12h' } })
