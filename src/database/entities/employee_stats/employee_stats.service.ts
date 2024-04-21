import { Injectable, Inject } from '@nestjs/common';
import { employee_stats } from './employee_stats.model';

@Injectable()
export class EmployeeStatsService {
  constructor(
    @Inject('EMPLOYEE_STATS_REPOSITORY')
    private employeeStatsRepository: typeof employee_stats,
  ) {}


}  