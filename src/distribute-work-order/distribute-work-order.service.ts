import { MainWorkOrder } from './../main-work-order/main-work-order.model';
import { Injectable, Inject } from '@nestjs/common';
import { IDistributeWorkOrder } from './distribute-work-order.interface';
import { DistributeWorkOrder } from './distribute-work-order.model';
import { WorkFlowAssignLog } from '../workflow-assign-log/workflow-assign-log.model';
import { MainWorkOrderService } from 'src/main-work-order/main-work-order.service';
import { FieldData } from 'src/field-data/field-data.model';
import { FieldDataService } from 'src/field-data/field-data.service';
import { Employee } from 'src/employee/employee.model';
import { AccountList } from 'src/account-list/account-list.model';
import { IFieldData } from 'src/field-data/field-data.interface';
import { EmployeeService } from 'src/employee/employee.service';
import { FieldTableService } from 'src/field-table/field-table.service';
import {FieldTable} from "../field-table/field-table.model";


@Injectable()
export class DistributeWorkOrderService {
  constructor(private readonly employeeService: EmployeeService) {}
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

  
  @Inject('FIELD_DATA_REPOSITORY')
  private readonly fieldTableModel: typeof FieldTable;
  private readonly fieldTableService: FieldTableService;



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
    // fieldData: number = null,
    employee_id: number,
    tasks: IFieldData,
  ): Promise<void> {
    try {
      await this.workFlowAssignLogModel.create({
        work_order_id: workOrder_id,
        field_data_id: tasks.id,
        assigned_to: employee_id,
      });
      console.log(`Task ${workOrder_id} assigned to ${employee_id}`);
      // console.log(tasks.id);

      const workOrder = await this.distributeWorkOrderModel.findOne({
        where: { work_order_id: workOrder_id, assigned_to: employee_id },
      });
      if (!workOrder) {
        await this.createDistributeWorkOrder({
          work_order_id: tasks.work_order_id,
          field_id: [tasks.id],
          assigned_to: employee_id,
          status: null,
          estimated_time: tasks.estimated_time,
        });
      }
      if (workOrder) {
        const field: number[] = workOrder.field_id;
        // field.push(tasks.id);
        const estimated_time = workOrder.estimated_time;
        const distributedTaskInfo = await this.distributeWorkOrderModel.findAll(
          {
            where: {
              work_order_id: workOrder_id,
              assigned_to: employee_id,
            },
          },
        );
        if (!field.includes(tasks.id)) {
          field.push(tasks.id);
          // console.log(field);
        }
        await this.distributeWorkOrderModel.update(
          {
            field_id: field,
            estimated_time: tasks.estimated_time + estimated_time,
          },
          {
            where: {
              work_order_id: distributedTaskInfo[0].work_order_id,
              assigned_to: employee_id,
            },
          },
        );
      }
    } catch (error) {
      console.log(
        `Error assigning task ${workOrder_id} to ${employee_id}:`,
        error,
      );
    }
  }

  async distributeTask(teamId: number = 2, roleId: number = 3): Promise<void> {
    try {
      const activeEmployees = await this.employeeModel.findAll({
        where: { active: true, role_id: roleId, team_id: teamId },
      });
      // console.log(activeEmployees.length);
      const tasks = await this.fieldDataModel.findAll({
        where: {
          assigned_to: null,
          value: null,
        },
      });

      const threshold = Math.ceil(tasks.length / activeEmployees.length);
      // console.log(threshold);

      for (let i = 0; i < activeEmployees.length; i++) {
        // let fieldIds = [];
        const tasks = await this.fieldDataModel.findAll({
          where: {
            assigned_to: null,
            value: null,
          },
        });
        // console.log(tasks);

        for (let j = 0; j < tasks.length; j++) {
          if (j < threshold) {
            await this.fieldDataModel.update(
              {
                assigned_to: activeEmployees[i].id,
                assigned_time: new Date(),
              },
              { where: { id: tasks[j].id } },
            );
            await this.assignTask(
              tasks[j].work_order_id,
              // tasks[j].field_id,
              activeEmployees[i].id,
              tasks[j],
            );

            // fieldIds.push(tasks[j].id);

            // const distributedTaskInfo =
            //   await this.distributeWorkOrderModel.findAll({
            //     where: {
            //       work_order_id: tasks[j].work_order_id,
            //       assigned_to: activeEmployees[i].id,
            //     },
            //   });
            // if (distributedTaskInfo.length === 0) {
            //   await this.createDistributeWorkOrder({
            //     work_order_id: tasks[j].work_order_id,
            //     field_id: [tasks[j].id],
            //     assigned_to: activeEmployees[i].id,
            //     status: null,
            //     estimated_time: tasks[j].estimated_time,
            //   });
            // } else {
            //   for (const task of distributedTaskInfo) {
            //     await this.distributeWorkOrderModel.update(
            //       {
            //         estimated_time:
            //           task.estimated_time + tasks[j].estimated_time,
            //         field_id: fieldIds,
            //       },
            //       {
            //         where: {
            //           work_order_id: tasks[j].work_order_id,
            //           assigned_to: activeEmployees[i].id,
            //         },
            //       },
            //     );
            //   }
            // }
          }
        }
      }

      console.log('Tasks distributed successfully for maker.');
    } catch (error) {
      console.error('Error distributing tasks:', error);
    }
  }
  async updateAllFieldData(): Promise<void> {
    const fieldData = await this.fieldDataModel.findAll({});
    for (const data of fieldData) {
      await this.fieldDataModel.update(
        { assigned_to: null },
        { where: { id: data.id } },
      );
    }
  }
  async findDistributedTasksByEmployeeId(
    employeeId: number, work_order_id: number
  ): Promise<IDistributeWorkOrder[]> {
    try {
      return await this.distributeWorkOrderModel.findAll({
        where: { assigned_to: employeeId, work_order_id: work_order_id },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async approveWorkOrder(work_order_id: number, assigned_to: number): Promise<any> {
    try {
      // Approve the work order
      let load_list = [];
      let temp;
      
      const workOrderValues = await this.sumOfFields(work_order_id);

      const approved = await this.distributeWorkOrderModel.update(
        { status: 'approved' },
        { where: { work_order_id: work_order_id, assigned_to: assigned_to } }
      );
  
      // Check if the work order is approved
      const checkApproved = await this.checkApproved(work_order_id);
      console.log('idk', checkApproved);
      if (checkApproved) {
        const allApproved = checkApproved.every(workOrder => workOrder.status === 'approved');
        if(allApproved){
          // const teamId = await this.employeeService.EmployeeTeamId(7);
          console.log('all aproved');
          temp =  await this.employeeService.EmployeeTeamId(assigned_to);
         
         for(let i = 0; i< temp.length; i++){
          console.log(temp[i]);
          const load = await this.getEmployeeWorkLoad(temp[i]);
          load_list[i] = load.length;
        }
      }
      } else {
        console.log('Work order not found or status not available.');
      }
      
      
      console.log('least work',temp[load_list.indexOf(Math.min(...load_list))] );
      console.log('temp', temp);
      console.log('wk', workOrderValues);
      await this.createNewAuthorOrder(work_order_id, workOrderValues.field_id, temp[load_list.indexOf(Math.min(...load_list))], workOrderValues.estimated_time);
      return temp; // Return the result of the update operation
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  async checkApproved(work_order_id: number): Promise<any> {
    try {
      // Find the work order by ID and get its status
      return await this.distributeWorkOrderModel.findAll({
        where: { work_order_id: work_order_id },
        attributes: ['status'],
        raw: true // Ensure raw data is returned
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getFields(work_order_id: number): Promise<any> {
    try {
      return await this.distributeWorkOrderModel.findAll({
        where: { work_order_id: work_order_id },
        attributes: ['field_id'],
        raw: true // Ensure raw data is returned
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getEmployeeWorkLoad(assigned_to: number): Promise<any> {
    return await this.distributeWorkOrderModel.findAll({
      where: { assigned_to: assigned_to },
    
    });
  }

  async sumOfFields(work_order_id: number): Promise<any> {  


    const fieldValueArray = [];
    let sumOfTiem = 0;
    const fieldsValue = await this.distributeWorkOrderModel.findAll({
      where: { work_order_id: work_order_id },
      attributes: ['field_id', 'estimated_time'],
      raw: true // Ensure raw data is returned
    });
    fieldsValue.forEach((field) => {
      field.field_id.forEach((id) => {
        fieldValueArray.push(id);
      });
      sumOfTiem += field.estimated_time;
      // field.field_id.concat(fieldValueArray);
    
    });
    
    return { field_id: fieldValueArray, estimated_time: sumOfTiem };
  }


  async createNewAuthorOrder( work_order_id: number, field_id: number[], assigned_to: number, estimated_time: number){

    await this.distributeWorkOrderModel.create({
      work_order_id: work_order_id,
      field_id: field_id,
      assigned_to: assigned_to,
      estimated_time: estimated_time,
      status: null
    })
  }

  async fieldsForReadWrite(work_order_id: number, assigned_to: number): Promise<any> {
    const field_ref =  await  this.distributeWorkOrderModel.findAll({
      where: { work_order_id: work_order_id, assigned_to: assigned_to }, attributes: ['field_id'], raw: true
    });
    const fields =  field_ref[0].field_id;
    // const field_value_id = await this.fieldDataService.fieldIdAndValuesAuthorized(fields);
    const field_id_value =  await FieldData.findAll({
      where: { id :fields},attributes: ['value', 'field_id'], raw: true
    })
    const field_id_array = []
    for(let i = 0; i< field_id_value.length; i++){
      // console.log( field_id_value[i].field_id)
      field_id_array[i] = field_id_value[i].field_id;
    }
    // console.log(field_id_array) 
    // const field_value = await this.fieldTableService.fieldNameForAuthorizer(field_id_array);
    const field_value = await FieldTable.findAll({
      where: { id :field_id_array}, attributes: ['field_name', 'id'], raw: true
    })
    console.log(field_value)
    console.log('gg', field_id_value)

    for(let i = 0; i< field_value.length; i++){

        field_value[i]['value'] = field_id_value.find(info => info.field_id === field_value[i].id).value
    }
    
    console.log(field_ref[0].field_id)
    console.log(field_value)
    return {fields: field_ref[0].field_id, fieldValue: field_value };
  }

}
// fieldDataModel