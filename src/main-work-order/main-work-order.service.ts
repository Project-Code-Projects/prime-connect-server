import { Injectable, Inject, Logger } from '@nestjs/common';
import { IMainWorkOrder } from './main-work-order.interface';
import { MainWorkOrder } from './main-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { Employee } from '../employee/employee.model';
import { AccountList } from '../account-list/account-list.model';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CustomerService } from '../customer/customer.service';
import { WorkflowService } from '../workflow/workflow.service';
import { Workflow } from '../workflow/workflow.model';
import { FieldData } from 'src/field-data/field-data.model';
import { FieldTable } from 'src/field-table/field-table.model';
import { IFieldData } from 'src/field-data/field-data.interface';
import { IFieldTable } from 'src/field-table/field-table.interface';
import { TeamField } from 'src/team-field/team_field.model';
import { Form } from 'src/form/form.model';
import { FormField } from 'src/form-field/form-field.model';
import { DocubucketService } from 'src/docu-bucket/docu-bucket.service';
import { log } from 'console';
import { DistributeWorkOrderService } from 'src/distribute-work-order/distribute-work-order.service';

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
    private readonly teamRoleService: WorkflowService,
    @Inject('FIELD_DATA_REPOSITORY')
    private readonly fieldDataModel: typeof FieldData,
    @Inject('FIELD_TABLE_REPOSITORY')
    private readonly fieldTableModel: typeof FieldTable,
    @Inject('TEAM_FIELD_REPOSITORY')
    private readonly teamFieldModel: typeof TeamField,
    @Inject('WORKFLOW_REPOSITORY')
    private readonly workflowModel: typeof Workflow,
    @Inject('FORM_REPOSITORY')
    private readonly formModel: typeof Form,
    @Inject('FORM_FIELD_REPOSITORY')
    private readonly formFieldModel: typeof FormField,
    private readonly docuBucketService: DocubucketService,
    private readonly distributeWorkOrderService: DistributeWorkOrderService,
  ) {}

  async getWorkOrderByEmployeeId(id: number): Promise<any> {
    return this.mainWorkOrderModel.findAll({
      where: { assigned_to: id, status: 'Read' },
    });
  }

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

  async distributeTask(
    teamId: number = 2,
    accId: number,
    workOrderId: number,
    rolId: number = 2,
  ): Promise<void> {
    try {
      const activeEmployees = await this.employeeModel.findAll({
        where: { active: true, role_id: rolId, team_id: teamId },
        include: [{ model: MainWorkOrder, as: 'employee' }],
      });
      let minTasksCount = Infinity;
      let employeeWithMinTasks: Employee | null = null;
      activeEmployees.forEach((employee) => {
        const tasksCount = employee.employee.length;
        if (tasksCount < minTasksCount) {
          minTasksCount = tasksCount;
          employeeWithMinTasks = employee;
        }
      });
      console.log(employeeWithMinTasks.id);

      // for (let i = 0; i < activeEmployees.length; i++) {
      //   const taskForReviwer = await this.mainWorkOrderModel.findAll({
      //     where: {
      //       assigned_to: null,
      //       isAssigned: false,
      //       status: 'need approval',
      //     },
      //   });

      // for (let j = 0; j < taskForReviwer.length; j++) {
      //   if (j < this.threshold) {
      await this.assignTask(workOrderId, null, employeeWithMinTasks.id);
      await this.updateMainWorkOrder(
        workOrderId,
        accId,
        employeeWithMinTasks.id,
      );
      // const teamRole = await this.workflowModel.findOne({
      //   where: { team_id: teamId, access: 'Write' },
      // });

      // const form = await this.formModel.findOne({
      //   where: { team_id: teamId, role_id: teamRole.id },
      // });
      // console.log(form.id);

      // const fieldIds = await this.formFieldModel.findAll({
      //   where: { form_id: form.id },
      // });
      // for (const fieldId of fieldIds) {
      //   // const tableField = await this.teamFieldModel.findOne({
      //   //   where: { field_id: fieldId.id },
      //   // });
      //   const estimatedTime = await this.fieldTableModel.findOne({
      //     where: { id: fieldId.field_id },
      //   });

      //   const fieldData = new FieldData({
      //     work_order_id: taskForReviwer[j].id,
      //     field_id: fieldId.id,

      //     value: null,
      //     status: null,
      //     estimated_time: estimatedTime.estimated_time,
      //     assigned_time: null,
      //     err_type: null,
      //     err_comment: null,
      //     sequence: parseInt(fieldId.sequence),
      //     // page: parseInt(fieldId.page),
      //     assigned_to: null,
      //   });

      //   await fieldData.save();
      // }
      // }
      // }
      // }

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
      // await this.distributeTask(workflow.team_id);
    }
  }
  async getWorkOrderByAccId(accId: number) {
    try {
      return await this.mainWorkOrderModel.findOne({
        where: { acc_id: accId },
        raw: true,
      });
    } catch (error) {
      console.error('Error fetching work order:', error);
      throw error; // Propagate the error
    }
  }

  async workOrderCustomerDetails(workOrderId: number) {
    try {
      return await this.mainWorkOrderModel.findOne({
        where: { id: workOrderId },
        attributes: ['acc_id', 'customer_id'],
        raw: true,
      });
    } catch (error) {
      console.error('Error fetching customer details:', error);
      throw error; // Propagate the error
    }
  }
  async explodeWorkOrder(teamId: number, workOrderId: number, access: string) {
    try {
      const teamRole = await this.workflowModel.findOne({
        where: { team_id: teamId, access: access },
      });

      // console.log('teamRole', teamRole.id);
      const form = await this.formModel.findOne({
        where: { team_id: teamId, role_id: teamRole.role_id },
      });
      console.log('form', form.id);
      const fieldIds = await this.formFieldModel.findAll({
        where: { form_id: form.id },
      });
      console.log('fieldIds', fieldIds);
      let i = await this.fieldDataModel.findOne({
        order: [['createdAt', 'DESC']], // Replace 'createdAt' with the column you want to order by
        limit: 1,
      });
      let j = 1;
      for (const fieldId of fieldIds) {
        // const tableField = await this.teamFieldModel.findOne({
        //   where: { field_id: fieldId.id },
        // });
        const estimatedTime = await this.fieldTableModel.findOne({
          where: { id: fieldId.field_id },
        });
        const fieldData = new FieldData({
          id: i.id++ + j,
          work_order_id: workOrderId,
          field_id: fieldId.id,
          value: null,
          status: null,
          estimated_time: estimatedTime.estimated_time,
          assigned_time: null,
          err_type: null,
          err_comment: null,
          sequence: parseInt(fieldId.sequence),
          // page: parseInt(fieldId.page),
          assigned_to: null,
        });
        await fieldData.save();
        j++;
      }
      this.distributeWorkOrderService.distributeTask(teamId, teamRole.role_id);
    } catch (error) {
      console.error('Error exploding work order:', error);
      throw error; // Propagate the error
    }
  }
}
