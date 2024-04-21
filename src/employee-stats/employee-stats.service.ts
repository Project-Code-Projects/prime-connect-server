import { Injectable, Inject } from '@nestjs/common';
import { EmployeeStats } from './employee-stats.model';
import { IEmployeeStats } from './employee-stats.interface';

@Injectable()
export class EmployeeStatsService {
  constructor(
    @Inject('EMPLOYEE_STATS_REPOSITORY')
    private readonly employeeStatsModel: typeof EmployeeStats,
  ) {}
}
