import { Module } from '@nestjs/common';
import { EmployeeController } from '../employee/employee.controller';
import { DatabaseModule } from 'src/database/database.module';
import { EmployeeStatsController } from './employee-stats.controller';
import { employeeStatsProviders } from './employee-stats.providers';
import { EmployeeStatsService } from './employee-stats.service';

@Module({
  imports: [DatabaseModule],
  controllers: [EmployeeStatsController],
  providers: [EmployeeStatsService, ...employeeStatsProviders],
})
export class EmployeeStatsModule {}
