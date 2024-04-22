import { DistributeWorkOrder } from './distribute-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { EmployeeRole } from '../employee-role/employee-role.model';
import { MainWorkOrder } from 'src/main-work-order/main-work-order.model';

export const distributeWorkOrderProviders = [
  {
    provide: 'DISTRIBUTE_WORKORDER_REPOSITORY',
    useValue: DistributeWorkOrder,
  },
  {
    provide: 'WORKFLOW_ASSIGN_LOG_REPOSITORY',
    useValue: WorkFlowAssignLog,
  },
  {
    provide: 'EMPLOYEE_ROLE_REPOSITORY',
    useValue: EmployeeRole,
  },
  {
    provide: 'MAIN_WORKORDER_REPOSITORY',
    useValue: MainWorkOrder,
  },
];
