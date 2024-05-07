import { Injectable, Inject, Logger } from '@nestjs/common';
import { IMainWorkOrder } from './main-work-order.interface';
import { MainWorkOrder } from './main-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { Employee } from '../employee/employee.model';
import { AccountList } from '../account-list/account-list.model';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CustomerService } from '../customer/customer.service';
import { TeamRoleService } from '../team_role_workflow/team_role_workflow.service';
import { TeamRole } from '../team_role_workflow/team_role_workflow.model';
import { FieldData } from 'src/field-data/field-data.model';
import { FieldTable } from 'src/field-table/field-table.model';
import { IFieldData } from 'src/field-data/field-data.interface';
import { IFieldTable } from 'src/field-table/field-table.interface';
import { TeamField } from 'src/team-field/team_field.model';
import { Form } from 'src/form/form.model';
import { FormField } from 'src/form-field/form-field.model';
import { DocubucketService } from 'src/docu-bucket/docu-bucket.service';



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
    @Inject('TEAM_ROLE_REPOSITORY')
    private readonly teamRoleModel: typeof TeamRole,
    @Inject('FORM_REPOSITORY')
    private readonly formModel: typeof Form,
    @Inject('FORM_FIELD_REPOSITORY')
    private readonly formFieldModel: typeof FormField,
    private readonly docuBucketService: DocubucketService
 
  ) {}

  async getWorkOrderByEmployeeId(id: number): Promise<any> {
    return this.mainWorkOrderModel.findAll({ where: { assigned_to: id } });
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

  async distributeTask(teamId: number = 2, rolId: number = 2): Promise<void> {
    try {
      const activeEmployees = await this.employeeModel.findAll({
        where: { active: true, role_id: rolId, team_id: teamId },
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
            const teamRole = await this.teamRoleModel.findOne({
              where: { team_id: teamId, access: 'Write' },
            });

            const form = await this.formModel.findOne({
              where: { team_id: teamId, role_id: teamRole.id },
            });
            console.log(form.id);

            const fieldIds = await this.formFieldModel.findAll({
              where: { form_id: form.id },
            });
            for (const fieldId of fieldIds) {
              // Get the ID of the associated field table
              // const tableField = await this.teamFieldModel.findOne({
              //   where: { field_id: fieldId.id },
              // });
              const estimatedTime = await this.fieldTableModel.findOne({
                where: { id: fieldId.field_id },
              });
              // Create a new FieldData record
              const fieldData = new FieldData({
                work_order_id: taskForReviwer[j].id, // Set the work order ID
                field_id: fieldId.id, // Use the ID of the associated field table
                // Set other properties as needed
                // For example:
                value: null, // You may need to set appropriate values here
                status: null,
                estimated_time: estimatedTime.estimated_time,
                assigned_time: null,
                err_type: null,
                err_comment: null,
                sequence: parseInt(fieldId.sequence),
                // page: parseInt(fieldId.page),
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

  async workOrderCustomerDetails(workOrderId: number) {
    try {
      return await this.mainWorkOrderModel.findOne({ where: { id: workOrderId }, attributes: ['acc_id', 'customer_id'], raw: true });
      
    } catch (error) {
      console.error('Error fetching customer details:', error);
      throw error; // Propagate the error
    }
  }
}
