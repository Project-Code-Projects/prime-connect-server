import { Injectable, Inject, Logger } from '@nestjs/common';
import { IMainWorkOrder } from './main-work-order.interface';
import { MainWorkOrder } from './main-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { Employee } from 'src/employee/employee.model';
import { AccountList } from 'src/account-list/account-list.model';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CustomerService } from 'src/customer/customer.service';
import { TeamRoleService } from 'src/team_role/team_role.service';
import { TeamRole } from 'src/team_role/team_role.model';
import { FieldData } from 'src/field-data/field-data.model';
import { FieldTable } from 'src/field-table/field-table.model';
import { IFieldData } from 'src/field-data/field-data.interface';
import { IFieldTable } from 'src/field-table/field-table.interface';
import { TeamField } from 'src/team-field/team_field.model';

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
    private readonly teamRoleService: TeamRoleService,
    @Inject('FIELD_DATA_REPOSITORY')
    private readonly fieldDataModel: typeof FieldData,
    @Inject('FIELD_TABLE_REPOSITORY')
    private readonly fieldTableModel: typeof FieldTable,
    @Inject('TEAM_FIELD_REPOSITORY')
    private readonly teamFieldModel: typeof TeamField,
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

  //task assignment
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
  async updateMainWorkOrder(
    workOrderId: number,
    accId: number,
    assigned_to: number,
  ): Promise<void> {
    try {
      await this.accountListModel.update(
        { current_state: 'reviewer' },
        { where: { id: accId } },
      );
      await this.mainWorkOrderModel.update(
        {
          assigned_to: assigned_to,
          start_time: new Date(),
          isAssigned: true,
        },
        { where: { id: workOrderId } },
      );

      console.log(
        `work order updated for task ${workOrderId} with assigned_to ${assigned_to}`,
      );
    } catch (error) {
      console.log(`Error updating work order for task ${workOrderId}:`, error);
      throw error;
    }
  }

  async distributeTask(rolId: number = 2): Promise<void> {
    try {
      const activeEmployees = await this.employeeModel.findAll({
        where: { active: true, admin: 'null', role_id: rolId },
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
            await this.assignTask(
              taskForReviwer[j].id,
              null,
              activeEmployees[i].id,
            );
            await this.updateMainWorkOrder(
              taskForReviwer[j].id,
              taskForReviwer[j].acc_id,
              activeEmployees[i].id,
            );
            const fieldTables = await this.fieldTableModel.findAll({});
            for (const fieldTable of fieldTables) {
              // Get the ID of the associated field table
              const tableField = await this.teamFieldModel.findOne({
                where: { field_id: fieldTable.id },
              });
              // Create a new FieldData record
              const fieldData = new FieldData({
                work_order_id: taskForReviwer[j].id, // Set the work order ID
                field_id: fieldTable.id, // Use the ID of the associated field table
                // Set other properties as needed
                // For example:
                value: null, // You may need to set appropriate values here
                status: null,
                estimated_time: fieldTable.estimated_time,
                start_time: null,
                err_type: null,
                err_comment: null,
                sequence: tableField.sequence,
                page: tableField.page,
                assigned_to: null, // You may need to set an appropriate value for assigned_to
              });

              // Save the new FieldData record to the database
              await fieldData.save();
            }
          }
        }
      }

      console.log('Tasks distributed successfully.');
    } catch (error) {
      console.error('Error distributing tasks:', error);
    }
  }

  // @Cron(CronExpression.EVERY_MINUTE, { name: 'distributeTask' })
  async distributeTaskByCron() {
    this.logger.debug('Running distributeTask cron job...');
    const workflows = await this.teamRoleService.findAllByAccess('Read');
    for (const workflow of workflows) {
      await this.distributeTask(workflow.team_id);
    }
  }
}
