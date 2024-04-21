import { Department } from './department.model';

export const departmentProvider = 
  {
    provide: 'DEPARTMENT_REPOSITORY',
    useValue: Department,
  }