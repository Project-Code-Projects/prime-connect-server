import { employee_stats } from './employee_stats.model';

export const employeeStatsProvider = 
{
  provide: 'EMPLOYEE_STATS_REPOSITORY',
  useValue: employee_stats,
}