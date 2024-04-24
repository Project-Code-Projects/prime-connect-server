import { MainWorkOrder } from './../main-work-order/main-work-order.model';
import { Injectable, Inject } from '@nestjs/common';
import { IDistributeWorkOrder } from './distribute-work-order.interface';
import { DistributeWorkOrder } from './distribute-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { MainWorkOrderService } from 'src/main-work-order/main-work-order.service';
import FieldData from 'src/field-data/field-data.model';
import { FieldDataService } from 'src/field-data/field-data.service';
import { Employee } from 'src/employee/employee.model';
import { AccountList } from 'src/account-list/account-list.model';

@Injectable()
export class DistributeWorkOrderService {
  constructor() {}
  @Inject('DISTRIBUTE_WORKORDER_REPOSITORY')
  private readonly distributeWorkOrderModel: typeof DistributeWorkOrder;

  @Inject('FIELD_DATA_REPOSITORY')
  private readonly fieldDataModel: typeof FieldData;
  private readonly fieldDataService: FieldDataService;
  @Inject('EMPLOYEE_REPOSITORY')
  private readonly employeeModel: typeof Employee;
  @Inject('ACCOUNT_LIST_REPOSITORY')
  private readonly accountListModel: typeof AccountList;
  @Inject('MAIN_WORK_ORDER_REPOSITORY')
  private readonly mainWorkOrderModel: typeof MainWorkOrder;
  private readonly mainWorkOrderService: MainWorkOrderService;

  @Inject('WORKFLOW_ASSIGN_LOG_REPOSITORY')
  private readonly workFlowAssignLogModel: typeof WorkFlowAssignLog;

  async findAllWorkOrder(): Promise<DistributeWorkOrder[]> {
    return await this.distributeWorkOrderModel.findAll();
  }
  async createDistributeWorkOrder(
    distributeWorkOrder: IDistributeWorkOrder,
  ): Promise<DistributeWorkOrder> {
    return this.distributeWorkOrderModel.create(distributeWorkOrder);
  }
  async assignTask(
    workOrder_id: number,
    fieldData: number = null,
    employee_id: number,
  ): Promise<void> {
    try {
      await this.workFlowAssignLogModel.create({
        work_order_id: workOrder_id,
        field_data_id: fieldData,
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
  async distributeTask(roleId: number = 3): Promise<void> {
    try {
      const activeEmployees = await this.employeeModel.findAll({
        where: { active: true, role_id: roleId },
      });
      console.log(activeEmployees.length);

      for (let i = 0; i < activeEmployees.length; i++) {
        let fieldIds = [];
        const tasks = await this.fieldDataModel.findAll({
          where: {
            assigned_to: null,
            value: null,
          },
        });
        // console.log(tasks);

        const threshold = Math.round(tasks.length / activeEmployees.length);
        console.log(threshold);

        for (let j = 0; j < tasks.length; j++) {
          if (j < threshold) {
            await this.fieldDataModel.update(
              { assigned_to: activeEmployees[i].id },
              { where: { id: tasks[j].id } },
            );
            await this.assignTask(
              tasks[j].work_order_id,
              tasks[j].field_id,
              activeEmployees[i].id,
            );
            console.log('working');

            fieldIds.push(tasks[j].id);

            const distributedTaskInfo =
              await this.distributeWorkOrderModel.findAll({
                where: {
                  work_order_id: tasks[j].work_order_id,
                  assigned_to: activeEmployees[i].id,
                },
              });
            if (distributedTaskInfo.length === 0) {
              await this.createDistributeWorkOrder({
                work_order_id: tasks[j].work_order_id,
                field_id: [tasks[j].id],
                assigned_to: activeEmployees[i].id,
                status: null,
                estimated_time: tasks[j].estimated_time,
              });
            } else {
              for (const task of distributedTaskInfo) {
                await this.distributeWorkOrderModel.update(
                  {
                    estimated_time:
                      task.estimated_time + tasks[j].estimated_time,
                    field_id: fieldIds,
                  },
                  {
                    where: {
                      work_order_id: tasks[j].work_order_id,
                      assigned_to: activeEmployees[i].id,
                    },
                  },
                );
              }
            }
          }
        }
      }

      console.log('Tasks distributed successfully for maker.');
    } catch (error) {
      console.error('Error distributing tasks:', error);
    }
  }
}
