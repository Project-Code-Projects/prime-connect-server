import { Injectable, Inject } from '@nestjs/common';
import { EmployeeStats } from './employee_stats.model';

@Injectable()
export class EmployeeStatsService {
  constructor(
    @Inject('EMPLOYEE_STATS_REPOSITORY')
    private employeeStatsRepository: typeof EmployeeStats,
  ) {}


}  