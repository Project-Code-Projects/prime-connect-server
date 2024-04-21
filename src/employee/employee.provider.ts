import { Employee } from './employee.model';

export const employeeProvider = 
    {
      provide: 'EMPLOYEE_REPOSITORY',
      useValue: Employee,
    }