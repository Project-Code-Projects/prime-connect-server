import { Injectable, Inject, Logger } from '@nestjs/common';
import { IMainWorkOrder } from './main-work-order.interface';
import { MainWorkOrder } from './main-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { Employee } from 'src/employee/employee.model';
import { AccountList } from 'src/account-list/account-list.model';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class MainWorkOrderService {
  private readonly logger = new Logger(MainWorkOrderService.name);
  private readonly threshold = 3;
  constructor(
    @Inject('MAIN_WORK_ORDER_REPOSITORY')
    private readonly mainWorkOrderModel: typeof MainWorkOrder,
    @Inject('WORKFLOW_ASSIGN_LOG_REPOSITORY')
    private readonly workFlowAssignLogModel: typeof WorkFlowAssignLog,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeModel: typeof Employee,
    @Inject('ACCOUNT_LIST_REPOSITORY')
    private readonly accountListModel: typeof AccountList,
  ) {}
  async createMainWorkOrder(
    revWorkOrder: IMainWorkOrder,
  ): Promise<MainWorkOrder> {
    return this.mainWorkOrderModel.create(revWorkOrder);
  }
  async updateStatusReviewer(id: number): Promise<void> {
    await this.mainWorkOrderModel.update(
      { status: 'maker', isAssigned: false },
      { where: { id } },
    );
  }
  async updateStatusMaker(id: number): Promise<void> {
    await this.mainWorkOrderModel.update(
      { status: 'checker', isAssigned: false },
      { where: { id } },
    );
  }

  async findAllWorkOrder(): Promise<MainWorkOrder[]> {
    return this.mainWorkOrderModel.findAll();
  }
  async assignTask(workOrder_id: number, employee_id: number): Promise<void> {
    try {
      await this.workFlowAssignLogModel.create({
        work_order_id: workOrder_id,
        field_data_id: null,
        assigned_to: employee_id,
      });
      console.log(`Task ${workOrder_id} assigned to ${employee_id}`);
    } catch (error) {
      console.log(
        `Error assigning task ${workOrder_id} to ${employee_id}:`,
        error,
      );
    }
  }
  async updateReviewerWorkOrder(
    id: number,

    assigned_to: number,
  ): Promise<void> {
    try {
      await this.accountListModel.update(
        { current_state: 'reviewer' },
        { where: { id: id } },
      );
      await this.mainWorkOrderModel.update(
        {
          assigned_to: assigned_to,
          start_time: new Date(),
          isAssigned: true,
        },
        { where: { id } },
      );
      console.log(
        `work order updated for task ${id} with assigned_to ${assigned_to}`,
      );
    } catch (error) {
      console.log(`Error updating work order for task ${id}:`, error);
      throw error;
    }
  }
  // async distributeTask(): Promise<void> {
  //   try {
  //     const activeEmployees = await this.employeeModel.findAll({
  //       where: { active: true, admin: null, role_id: 2 },
  //     });

  //     await Promise.all(
  //       activeEmployees.map(async (employee) => {
  //         const tasks = await this.reviewerWorkOrderModel.findAll({
  //           where: {
  //             status: 'need approval',
  //             isAssigned: false,
  //           },
  //           limit: this.threshold,
  //         });

  //         await Promise.all(
  //           tasks.map(async (task) => {
  //             await this.assignTask(task.id, employee.id);
  //             await this.updateReviewerWorkOrder(
  //               task.id,

  //               employee.id,
  //             );
  //           }),
  //         );
  //       }),
  //     );

  //     console.log('Tasks distributed successfully.');
  //   } catch (error) {
  //     console.error('Error distributing tasks:', error);
  //   }
  // }

  async distributeTask(): Promise<void> {
    try {
      const activeEmployees = await this.employeeModel.findAll({
        where: { active: true, admin: 'null', role_id: 2 },
      });
      for (let i = 0; i < activeEmployees.length; i++) {
        const taskForReviwer = await this.mainWorkOrderModel.findAll({
          where: {
            assigned_to: null,
            isAssigned: false,
            status: 'need approval',
          },
        });

        for (let j = 0; j < taskForReviwer.length; j++) {
          if (j < this.threshold) {
            await this.assignTask(taskForReviwer[j].id, activeEmployees[i].id);
            await this.updateReviewerWorkOrder(
              taskForReviwer[j].id,
              activeEmployees[i].id,
            );
          }
        }
      }

      console.log('Tasks distributed successfully.');
    } catch (error) {
      console.error('Error distributing tasks:', error);
    }
  }

  // @Cron(CronExpression.EVERY_MINUTE, { name: 'distributeTask' })
  distributeTaskByCron() {
    this.logger.debug('Running distributeTask cron job...');
    return this.distributeTask();
  }

  async updateReviwerWorkOrder(id: number): Promise<void> {
    await this.mainWorkOrderModel.update(
      { status: 'reviewed' },
      { where: { id } },
    );
  }
}
