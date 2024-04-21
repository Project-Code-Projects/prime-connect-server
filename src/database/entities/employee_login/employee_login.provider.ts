import { employee_login } from './employee_login.model';

export const employeeLoginProvider = 
{
    provide: 'EMPLOYEE_LOGIN_REPOSITORY',
    useValue: employee_login,
  }