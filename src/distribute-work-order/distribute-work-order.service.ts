import { EmployeeStats } from './../employee_stats/employee_stats.model';
import { EmployeeStatsService } from './../employee_stats/employee_stats.service';
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
import { FieldTable } from '../field-table/field-table.model';
import sequelize from 'sequelize';

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

  @Inject('EMPLOYEE_STATS_REPOSITORY')
  private readonly employeeStatsModel: typeof EmployeeStats;

  async findAllWorkOrder(): Promise<DistributeWorkOrder[]> {
    return await this.distributeWorkOrderModel.findAll();
  }

  async findDistributedWorksByEmployeeId(id: number) {
    return await this.distributeWorkOrderModel.findAll({
      where: { assigned_to: id },
    });
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
    employeeId: number,
    work_order_id: number,
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

  async approveWorkOrder(
    work_order_id: number,
    assigned_to: number,
  ): Promise<any> {
    try {
      let load_list = [];
      let temp;

      const workOrderValues = await this.sumOfFields(work_order_id);
      console.log('workOrderValues', workOrderValues);

      const approved = await this.distributeWorkOrderModel.update(
        { status: 'approved' },
        { where: { work_order_id: work_order_id, assigned_to: assigned_to } },
      );

      const checkApproved = await this.checkApproved(work_order_id);
      console.log('idk', checkApproved);
      if (checkApproved) {
        const allApproved = checkApproved.every(
          (workOrder) => workOrder.status === 'approved',
        );
        if (allApproved) {
          // const teamId = await this.employeeService.EmployeeTeamId(7);
          console.log('all aproved');
          temp = await this.employeeService.EmployeeTeamId(assigned_to);

          for (let i = 0; i < temp.length; i++) {
            console.log(temp[i]);
            const load = await this.getEmployeeWorkLoad(temp[i]);
            load_list[i] = load.length;
          }
        }
      } else {
        console.log('Work order not found or status not available.');
      }

      console.log(
        'least work',
        temp[load_list.indexOf(Math.min(...load_list))],
      );
      console.log('temp', temp);
      console.log('wk', workOrderValues);
      await this.createNewAuthorOrder(
        work_order_id,
        workOrderValues.field_id,
        temp[load_list.indexOf(Math.min(...load_list))],
        workOrderValues.estimated_time,
      );
      return temp;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async checkApproved(work_order_id: number): Promise<any> {
    try {
      return await this.distributeWorkOrderModel.findAll({
        where: { work_order_id: work_order_id },
        attributes: ['status'],
        raw: true,
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
        raw: true,
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
      raw: true, // Ensure raw data is returned
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

  async createNewAuthorOrder(
    work_order_id: number,
    field_id: number[],
    assigned_to: number,
    estimated_time: number,
  ) {
    await this.distributeWorkOrderModel.create({
      work_order_id: work_order_id,
      field_id: field_id,
      assigned_to: assigned_to,
      estimated_time: estimated_time,
      status: null,
    });
  }

  async fieldsForReadWrite(
    work_order_id: number,
    assigned_to: number,
  ): Promise<any> {
    const field_ref = await this.distributeWorkOrderModel.findAll({
      where: { work_order_id: work_order_id, assigned_to: assigned_to },
      attributes: ['field_id'],
      raw: true,
    });

    const fields = field_ref[0].field_id;
    const fieldsArray = [];

    fields.forEach(async (id) => {
      // fieldsArray.push(id);
      let field4field = await this.fieldForField(id);

      fieldsArray.push({
        [field4field[0].field_id]: id,
      });
    });
    console.log('fields', fieldsArray);

    // const field_value_id = await this.fieldDataService.fieldIdAndValuesAuthorized(fields);
    const field_id_value = await FieldData.findAll({
      where: { id: fields },
      attributes: ['value', 'field_id'],
      raw: true,
    });
    const field_id_array = [];
    for (let i = 0; i < field_id_value.length; i++) {
      // console.log( field_id_value[i].field_id)
      field_id_array[i] = field_id_value[i].field_id;
    }
    // console.log(field_id_array)
    // const field_value = await this.fieldTableService.fieldNameForAuthorizer(field_id_array);
    const field_value = await FieldTable.findAll({
      where: { id: field_id_array },
      attributes: ['field_name', 'id'],
      raw: true,
    });
    console.log(field_value);
    console.log('gg', field_id_value);

    for (let i = 0; i < field_value.length; i++) {
      field_value[i]['value'] = field_id_value.find(
        (info) => info.field_id === field_value[i].id,
      ).value;
    }

    console.log(field_ref[0].field_id);
    console.log(field_value);
    console.log('field_ref[0].field_id', fieldsArray);
    return { fields: fieldsArray, fieldValue: field_value };
  }

  async fieldForField(fields: number): Promise<any> {
    return await FieldData.findAll({
      where: { id: fields },
      attributes: ['field_id'],
      raw: true,
    });
  }


  async postErrorFields(fields: number[], comments: any[], fields_assign: number[], work_order_id: number, assigned_to: number, time_interval: number, error_count: number): Promise<any> {
    // const updatedFields = [];
    if (fields.length > 0) {
      const temp = await this.employeeService.AuthorTeamId(assigned_to);
      const load_list = [];

      for (let i = 0; i < temp.length; i++) {
        console.log(temp[i]);
        const load = await this.getEmployeeWorkLoad(temp[i]);
        load_list[i] = load.length;
      }
      const least_work_load = temp[load_list.indexOf(Math.min(...load_list))];


      for (let i = 0; i < fields_assign.length; i++) {

        let field_assigned_to = await this.fieldDataModel.findOne({where: {id: fields_assign[i]}, attributes: ['assigned_to'], raw: true});
        let employee_with_error = field_assigned_to.assigned_to;
        const fieldId = fields_assign[i];
        const comment = comments[i] || ''; // To avoid out-of-bound access in case comments array is shorter
        console.log('employee error', typeof employee_with_error);
        try {
          const updatedField = await this.fieldDataModel.update(
            {
              err_type: 'Error',
              prev_assigned: sequelize.fn(
                'array_append',
                sequelize.col('prev_assigned'),
                employee_with_error,
              ),
              err_comment: comment,
              assigned_to: least_work_load,
            },
            { where: { id: fieldId } },
          );
          console.log('Update successful:', updatedField);
        } catch (error) {
          console.error('Error updating field:', error);
      } 
      }
      await this.createNewAuthorOrder(work_order_id, fields_assign, temp[load_list.indexOf(Math.min(...load_list))], 8);

      await this.postEmployeeStatsforReadWrite(work_order_id, time_interval, error_count, assigned_to, fields_assign)
    }else{
      await this.distributeWorkOrderModel.update(
        { status: 'Done' },
        { where: { work_order_id: work_order_id, assigned_to: assigned_to } },
      );
    }
  }

  async postEmployeeStats(work_order_id: number, time_interval: number, error_count: number, employee_id: number) {
    console.log('check',work_order_id, time_interval, error_count, employee_id);
    const prev_employee = await Employee.findOne({ where: { id: employee_id }, attributes: ['team_id', 'role_id'], raw: true });
    const time = await this.distributeWorkOrderModel.findOne({ where: { work_order_id: work_order_id, assigned_to: employee_id }, attributes: ['estimated_time', 'createdAt'], raw: true });
    
    console.log(time)
    const target_time = time.estimated_time;
    const time_allotted_ms = Date.now() - new Date(time.createdAt).getTime(); // Calculate the time difference in milliseconds
    const time_allotted = Math.floor(time_allotted_ms / (1000 * 60)); // Convert milliseconds to minutes
    console.log(target_time, time_allotted);
    await EmployeeStats.create({ 
        work_order_id, 
        target_time, 
        time_interval, 
        time_allotted: time_allotted, // Convert time_allotted to string
        error_count: error_count, // Convert error_count to string
        employee_id, 
        team_id: prev_employee.team_id, 
        role_id: prev_employee.role_id
    });
    
}


async incrementErrorCount(list: number[]) {
  console.log('great job', list)
  for (const field_id of list) {
    console.log('inside for loop',field_id)
    const field_values = await FieldData.findOne({ where: { id: field_id }, attributes: ['work_order_id', 'prev_assigned'], raw: true });
    console.log('field values', field_values)
    const work_order_id = field_values.work_order_id;
    const employee_id = field_values.prev_assigned[0];
    

    // Find the existing EmployeeStats record for the given work_order_id and employee_id
    const employeeStats = await EmployeeStats.findOne({ where: { work_order_id, employee_id } });

    // If a record exists, increment the error_count
    console.log('employee stats',employeeStats)
    if (employeeStats) {
      console.log('incrementing error count');	
      await employeeStats.increment('error_count');
    }
  }
}


async postEmployeeStatsforReadWrite(work_order_id: number, time_interval: number, error_count: number, employee_id: number, list: number[]) {
  const prev_employee = await Employee.findOne({ where: { id: employee_id }, attributes: ['team_id', 'role_id'], raw: true });
  const time = await this.distributeWorkOrderModel.findOne({ where: { work_order_id: work_order_id, assigned_to: employee_id }, attributes: ['estimated_time', 'createdAt'], raw: true });
  console.log('double hit')
  const target_time = time.estimated_time;
  const time_allotted_ms = Date.now() - new Date(time.createdAt).getTime(); // Calculate the time difference in milliseconds
  const time_allotted = Math.floor(time_allotted_ms / (1000 * 60)); // Convert milliseconds to minutes
  console.log(target_time, time_allotted);
  await EmployeeStats.create({ 
      work_order_id, 
      target_time, 
      time_interval, 
      time_allotted: time_allotted, // Convert time_allotted to string
      error_count: error_count, // Convert error_count to string
      employee_id, 
      team_id: prev_employee.team_id, 
      role_id: prev_employee.role_id
  });

  await this.incrementErrorCount(list);
}



}
