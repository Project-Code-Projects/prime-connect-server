import { MainWorkOrder } from './main-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { Employee } from '../employee/employee.model';
import { CustomerAccountList } from 'src/customer/customer.model';

export const mainWorkOrderProviders = [
  {
    provide: 'MAIN_WORK_ORDER_REPOSITORY',
    useValue: MainWorkOrder,
  },
  {
    provide: 'WORKFLOW_ASSIGN_LOG_REPOSITORY',
    useValue: WorkFlowAssignLog,
  },
  {
    provide: 'EMPLOYEE_REPOSITORY',
    useValue: Employee,
  },
  {
    provide: 'CUSTOMER_ACCOUNT_LIST_REPOSITORY',
    useValue: CustomerAccountList,
  },
];
