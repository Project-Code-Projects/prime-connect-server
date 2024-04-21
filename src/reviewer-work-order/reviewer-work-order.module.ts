import { Module } from '@nestjs/common';
import { ReviewerWorkOrderService } from './reviewer-work-order.service';
import { DatabaseModule } from 'src/database/database.module';
import { reviewerWorkOrderProviders } from './reviewer-work-order.providers';
import { ReviewerWorkOrderController } from './reviewer-work-order.controller';
import { EmployeeRoleModule } from 'src/employee-role/employee-role.module';
import { EmployeeRoleService } from 'src/employee-role/employee-role.service';
import ReviewerWorkOrder from './reviewer-work-order.model';
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

@Module({
  imports: [DatabaseModule, EmployeeModule, WorkFlowAssignLogModule],
  controllers: [ReviewerWorkOrderController],
  providers: [
    ReviewerWorkOrderService,
    EmployeeService,

    WorkFlowAssignLogService,

    ...employeeProviders,
    ...workFlowAssignLogProviders,
    ...reviewerWorkOrderProviders,
  ],
})
export class ReviewerWorkOrderModule {}
