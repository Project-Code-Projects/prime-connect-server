import { MainWorkOrder } from './main-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { EmployeeRole } from '../employee-role/employee-role.model';
import { ReviewerWorkOrder } from 'src/reviewer-work-order/reviewer-work-order.model';

export const mainworkOrderProviders = [
  {
    provide: 'MAIN_WORKORDER_REPOSITORY',
    useValue: MainWorkOrder,
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
    provide: 'REVIEWER_WORKORDER_REPOSITORY',
    useValue: ReviewerWorkOrder,
  },
];
