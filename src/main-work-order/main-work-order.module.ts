import { Module } from '@nestjs/common';
import { MainWorkOrderService } from './main-work-order.service';
import { DatabaseModule } from 'src/database/database.module';
import { mainworkOrderProviders } from './main-work-order.providers';
import { MainWorkOrderController } from './main-work-order.controller';
import { EmployeeRoleModule } from 'src/employee-role/employee-role.module';
import { EmployeeRoleService } from 'src/employee-role/employee-role.service';
import { ReviewerWorkOrder } from 'src/reviewer-work-order/reviewer-work-order.model';
import { reviewerWorkOrderProviders } from 'src/reviewer-work-order/reviewer-work-order.providers';
import { ReviewerWorkOrderService } from 'src/reviewer-work-order/reviewer-work-order.service';

@Module({
  imports: [DatabaseModule, EmployeeRoleModule, ReviewerWorkOrder],
  controllers: [MainWorkOrderController],
  providers: [
    MainWorkOrderService,
    EmployeeRoleService,
    ReviewerWorkOrderService,
    ...mainworkOrderProviders,
    ...reviewerWorkOrderProviders,
  ],
})
export class MainWorkOrderModule {}
