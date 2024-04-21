import { Module } from '@nestjs/common';
import { EmployeeStatsController } from './employee_stats.controller';
import { EmployeeStatsService } from './employee_stats.service';
import { employeeStatsProvider } from './employee_stats.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [EmployeeStatsController],
    providers: [
      EmployeeStatsService,
      employeeStatsProvider
    ],
  })
  export class EmployeeStatsModule {}