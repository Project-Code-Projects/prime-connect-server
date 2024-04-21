import { department } from './department.model';

export const departmentProvider = 
  {
    provide: 'DEPARTMENT_REPOSITORY',
    useValue: department,
  }