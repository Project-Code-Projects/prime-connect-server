import { Injectable, Inject, Logger } from '@nestjs/common';
import { IReviewerWorkOrder } from './reviewer-work-order.interface';
import { ReviewerWorkOrder } from './reviewer-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import Employee from 'src/employee/employee.model';
import { CustomerAccountList } from 'src/customer/customer.model';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CustomerService } from 'src/customer/customer.service';

@Injectable()
export class ReviewerWorkOrderService {
  private readonly logger = new Logger(ReviewerWorkOrderService.name);
  private readonly threshold = 3;
  constructor(
    @Inject('REVIEWER_WORK_ORDER_REPOSITORY')
    private readonly reviewerWorkOrderModel: typeof ReviewerWorkOrder,
    @Inject('WORKFLOW_ASSIGN_LOG_REPOSITORY')
    private readonly workFlowAssignLogModel: typeof WorkFlowAssignLog,
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeModel: typeof Employee,
    @Inject('CUSTOMER_ACCOUNT_LIST_REPOSITORY')
    private readonly customerACCListModel: typeof CustomerAccountList,
  ) {}
  async createReviewerWorkOrder(
    revWorkOrder: IReviewerWorkOrder,
  ): Promise<ReviewerWorkOrder> {
    return this.reviewerWorkOrderModel.create(revWorkOrder);
  }
  async updateStatusReviewer(id: number): Promise<void> {
    await this.reviewerWorkOrderModel.update(
      { status: 'maker', isAssigned: false },
      { where: { id } },
    );
  }
  async updateStatusMaker(id: number): Promise<void> {
    await this.reviewerWorkOrderModel.update(
      { status: 'checker', isAssigned: false },
      { where: { id } },
    );
  }

  async findAllWorkOrder(): Promise<ReviewerWorkOrder[]> {
    return this.reviewerWorkOrderModel.findAll();
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
      await this.customerACCListModel.update(
        { current_state: 'reviewer' },
        { where: { acc_id: id } },
      );
      await this.reviewerWorkOrderModel.update(
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
      const activeEmployeesReviewer = await this.employeeModel.findAll({
        where: { active: true, admin: 'null', role_id: 2 },
      });
      for (let i = 0; i < activeEmployeesReviewer.length; i++) {
        const taskForReviwer = await this.reviewerWorkOrderModel.findAll({
          where: {
            assigned_to: null,
            isAssigned: false,
            status: 'need approval',
          },
        });

        for (let j = 0; j < taskForReviwer.length; j++) {
          if (j < this.threshold) {
            await this.assignTask(
              taskForReviwer[j].id,
              activeEmployeesReviewer[i].id,
            );
            await this.updateReviewerWorkOrder(
              taskForReviwer[j].id,
              activeEmployeesReviewer[i].id,
            );
          }
        }
      }

      console.log('Tasks distributed successfully.');
    } catch (error) {
      console.error('Error distributing tasks:', error);
    }
  }

  @Cron(CronExpression.EVERY_MINUTE, { name: 'distributeTask' })
  distributeTaskByCron() {
    this.logger.debug('Running distributeTask cron job...');
    return this.distributeTask();
  }

  async updateReviwerWorkOrder(id: number): Promise<void> {
    await this.reviewerWorkOrderModel.update(
      { status: 'reviewed' },
      { where: { id } },
    );
  }
}
