import { EmployeeRole } from './employee-role.model';

export const employeeRoleProviders = [
  {
    provide: 'EMPLOYEE_ROLE_REPOSITORY',
    useValue: EmployeeRole,
  },
];
