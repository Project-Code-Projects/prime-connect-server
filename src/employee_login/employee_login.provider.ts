import { EmployeeLogin } from './employee_login.model';

export const employeeLoginProvider = 
{
    provide: 'EMPLOYEE_LOGIN_REPOSITORY',
    useValue: EmployeeLogin,
  }