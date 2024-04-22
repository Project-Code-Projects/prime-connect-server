import { Injectable, Inject, Logger } from '@nestjs/common';
import { WorkFlowAssignLog } from './workflow-assign-log.model';

import { Employee } from '../employee/employee.model';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmployeeRole } from '../employee-role/employee-role.model';
import { Op } from 'sequelize';
import { Customer } from '../customer/customer.model';
import { AccountList } from 'src/account-list/account-list.model';

export interface IWorkFlowAssignLogWithNames {
  id: number;
  acc_id: number;
  work_order_id: number;
  acc_type: string;
  employee_name: string;
  role_name: string;
}
@Injectable()
export class WorkFlowAssignLogService {
  private readonly logger = new Logger(WorkFlowAssignLogService.name);
  private readonly threshold = 3;

  constructor(
    @Inject('WORKFLOW_ASSIGN_LOG_REPOSITORY')
    private readonly workFlowAssignLogModel: typeof WorkFlowAssignLog,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeModel: typeof Employee,
    @Inject('EMPLOYEE_ROLE_REPOSITORY')
    private readonly employeeRoleModel: typeof EmployeeRole,
    @Inject('CUSTOMER_REPOSITORY')
    private readonly customerModel: typeof Customer,
    @Inject('ACCOUNT_LIST_REPOSITORY')
    private readonly accountListModel: typeof AccountList,
  ) {}
}
