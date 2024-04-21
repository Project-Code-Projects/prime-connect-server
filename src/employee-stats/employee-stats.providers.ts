import { EmployeeStats } from './employee-stats.model';

export const employeeStatsProviders = [
  {
    provide: 'EMPLOYEE_STATS_REPOSITORY',
    useValue: EmployeeStats,
  },
];
