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
import { teamRoleProvider } from 'src/team_role/team_role.provider';
import { TeamRoleService } from 'src/team_role/team_role.service';
import { employeeProvider } from 'src/employee/employee.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [DistributeWorkOrderController],
  providers: [
    DistributeWorkOrderService,
    TeamRoleService,
    EmployeeRoleService,
    ...distributeWorkOrderProviders,

    teamRoleProvider,
    employeeProvider,
  ],
})
export class DistributeWorkOrderModule {}
