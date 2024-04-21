import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { EmployeeController } from './employee.controller';
import { employeeProviders } from './employee.providers';
import { EmployeeService } from './employee.service';
import { ReviewerWorkOrderService } from 'src/reviewer-work-order/reviewer-work-order.service';
import { reviewerWorkOrderProviders } from 'src/reviewer-work-order/reviewer-work-order.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    ReviewerWorkOrderService,
    ...employeeProviders,
    ...reviewerWorkOrderProviders,
  ],
})
export class EmployeeModule {}
