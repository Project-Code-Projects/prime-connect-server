import { WorkFlowAssignLog } from './workflow-assign-log.model';
import { WorkflowAssignLogController } from './workflow-assign-log.controller';

import { Employee } from '../employee/employee.model';
import { EmployeeRole } from '../employee-role/employee-role.model';
import { Customer } from '../customer/customer.model';
import { AccountList } from 'src/account-list/account-list.model';

export const workFlowAssignLogProviders = [
  {
    provide: 'WORKFLOW_ASSIGN_LOG_REPOSITORY',
    useValue: WorkFlowAssignLog,
  },

  {
    provide: 'EMPLOYEE_REPOSITORY',
    useValue: Employee,
  },
  {
    provide: 'EMPLOYEE_ROLE_REPOSITORY',
    useValue: EmployeeRole,
  },
  {
    provide: 'CUSTOMER_REPOSITORY',
    useValue: Customer,
  },
  {
    provide: 'ACCOUNT_LIST_REPOSITORY',
    useValue: AccountList,
  },
];
