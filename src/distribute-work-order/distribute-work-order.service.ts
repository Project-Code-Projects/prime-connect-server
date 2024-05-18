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
import sequelize, { Op } from 'sequelize';
import { stat } from 'fs';

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

  async findDistributedWorksByEmployeeId(
    id: number,
    access: string,
  ): Promise<any> {
    let status: string | null;
    if (access == 'Write') status = null; //chenging for code analysis
    if (access == 'Read_Write') status = null;
    console.log(status);
    const distributed_work = await this.distributeWorkOrderModel.findAll({
      where: { assigned_to: id, [Op.or]: [{ status: null }, { status: '' }] },
    });
    console.log('status check', status);
    console.log('distributed_work', distributed_work);
    return distributed_work;
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
      // if (!workOrder) {
      let i = await this.distributeWorkOrderModel.findOne({
        order: [['createdAt', 'DESC']],
        limit: 1,
      });
      let id = 0;
      if (i) {
        id = i.id;
      } else {
        id = 0;
      }
      console.log('id', id);

      await this.distributeWorkOrderModel.create({
        id: id + 1,
        work_order_id: tasks.work_order_id,
        field_id: [tasks.id],
        assigned_to: employee_id,
        status: null,
        estimated_time: tasks.estimated_time,
      });
      // }
      // if (workOrder) {
      //   const field: number[] = workOrder.field_id;
      //   // field.push(tasks.id);
      //   const estimated_time = workOrder.estimated_time;
      //   const distributedTaskInfo = await this.distributeWorkOrderModel.findAll(
      //     {
      //       where: {
      //         work_order_id: workOrder_id,
      //         assigned_to: employee_id,
      //       },
      //     },
      //   );
      //   if (!field.includes(tasks.id)) {
      //     field.push(tasks.id);
      //     // console.log(field);
      //   }
      //   await this.distributeWorkOrderModel.update(
      //     {
      //       field_id: field,
      //       estimated_time: tasks.estimated_time + estimated_time,
      //     },
      //     {
      //       where: {
      //         work_order_id: distributedTaskInfo[0].work_order_id,
      //         assigned_to: employee_id,
      //       },
      //     },
      //   );
      // }
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
      const empLen = activeEmployees.length;
      // console.log(activeEmployees.length);
      const tasks = await this.fieldDataModel.findAll({
        where: {
          assigned_to: null,
          value: null,
        },
      });
      const len = tasks.length;
      let k = 0;
      const threshold = Math.floor(Math.random() * len) + 1;
      console.log('threshold: ', threshold);

      while (k < len) {
        for (let i = 0; i < empLen; i++) {
          // let fieldIds = [];
          // const tasks = await this.fieldDataModel.findAll({
          //   where: {
          //     assigned_to: null,
          //     value: null,
          //   },
          // });
          // console.log(tasks);
          // let activeEmployees;
          // let minTasksCount = Infinity;
          // let employeeWithMinTasks: Employee | null = null;
          // const work = await this.distributeWorkOrderModel.count({});
          // if (work > 0) {
          //   activeEmployees = await this.employeeModel.findAll({
          //     where: { active: true, role_id: roleId, team_id: teamId },
          //     include: [
          //       {
          //         model: DistributeWorkOrder,
          //         as: 'dEmployee',
          //         where: { [Op.or]: [{ status: null }, { status: '' }] },
          //       },
          //     ],
          //   });

          //   activeEmployees.forEach((employee) => {
          //     const tasksCount = employee.dEmployee.length;
          //     if (tasksCount < minTasksCount) {
          //       minTasksCount = tasksCount;
          //       employeeWithMinTasks = employee;
          //     }
          //   });
          // } else {
          //   activeEmployees = await this.employeeModel.findAll({
          //     where: { active: true, role_id: roleId, team_id: teamId },
          //   });

          //   employeeWithMinTasks = activeEmployees[0];
          // }

          // console.log(employeeWithMinTasks.id);

          for (let j = 0; j < threshold && k < len; j++) {
            await this.fieldDataModel.update(
              {
                assigned_to: activeEmployees[i].id,
                assigned_time: new Date(),
              },
              { where: { id: tasks[k].id } },
            );
            await this.assignTask(
              tasks[k].work_order_id,
              // tasks[j].field_id,
              activeEmployees[i].id,
              tasks[k],
            );
            k++;
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
  ): Promise<any> {
    try {
      const dist = await this.distributeWorkOrderModel.findAll({
        where: {
          assigned_to: employeeId,
          [Op.or]: [{ status: null }, { status: '' }], //analysis make null
        },
        raw: true, //need change here
      });

      
      const new_field_array = dist.map((field)=> field.field_id[0]);

      const fields = await FieldData.findAll({
        where: { work_order_id: work_order_id, status: null },
        attributes: ['id'],
        raw: true,
      });
      const fields_array = fields.map((field) => field.id);   //might need this part for analysis

      return { dist: dist, fields: new_field_array }; //could make this part efficient
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
      const approved = await this.distributeWorkOrderModel.update(
        //this part is approving the work order
        { status: 'approved' },
        { where: { work_order_id: work_order_id, assigned_to: assigned_to } }, //testing
      );

      const checkAllApproved = await this.checkApproved(work_order_id);

      const allApproved = checkAllApproved.every(
        (workOrder) =>
          workOrder.status === 'approved' || workOrder.status === 'authorized',
      );

      console.log('all approved check', allApproved);
      if (allApproved) {
        const workOrderValues = await this.sumOfFields(work_order_id);

        temp = await this.employeeService.EmployeeTeamId(assigned_to);

        for (let i = 0; i < temp.length; i++) {
          const load = await this.getEmployeeWorkLoad(temp[i]);
          load_list[i] = load.length;
        }
        console.log('workOrderValues.field_id', workOrderValues.field_id);
        await this.createNewAuthorOrder(
          work_order_id,
          workOrderValues.field_id,
          temp[load_list.indexOf(Math.min(...load_list))],
          workOrderValues.estimated_time,
        );
      }
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
    const fieldsValue = await FieldData.findAll({
      where: { work_order_id: work_order_id },
      attributes: ['id', 'estimated_time'],
      raw: true,
    });

    fieldsValue.forEach((field) => {
      //poc of code

      fieldValueArray.push(field.id);

      sumOfTiem += field.estimated_time;
      // field.field_id.concat(fieldValueArray);
    });
    const obj = { field_id: fieldValueArray, estimated_time: sumOfTiem };
    console.log('check checker fields', obj);
    return obj;
  }

  async createNewAuthorOrder(
    work_order_id: number,
    field_id: number[],
    assigned_to: number,
    estimated_time: number,
  ) {
    try {
      let i = await this.distributeWorkOrderModel.findOne({
        order: [['createdAt', 'DESC']],
        limit: 1,
      });
      let j = i.id + 1;

      const newDistributeWorkOrder = await this.distributeWorkOrderModel.create(
        {
          id: j,
          work_order_id: work_order_id,
          field_id: field_id,
          assigned_to: assigned_to,
          estimated_time: estimated_time,
          status: null,
        },
      );

      // The newDistributeWorkOrder object will have the auto-generated id
    } catch (error) {
      console.error('Error inserting new record:', error);
    }
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

    // const field_value_id = await this.fieldDataService.fieldIdAndValuesAuthorized(fields);
    const field_id_value = await FieldData.findAll({
      where: { id: fields },
      attributes: ['value', 'field_id'],
      raw: true,
    });
    const field_id_array = [];
    for (let i = 0; i < field_id_value.length; i++) {
      field_id_array[i] = field_id_value[i].field_id;
    }

    const field_value = await FieldTable.findAll({
      where: { id: field_id_array },
      attributes: ['field_name', 'id'],
      raw: true,
    });

    for (let i = 0; i < field_value.length; i++) {
      field_value[i]['value'] = field_id_value.find(
        (info) => info.field_id === field_value[i].id,
      ).value;
    }

    return { fields: fieldsArray, fieldValue: field_value };
  }

  async fieldForField(fields: number): Promise<any> {
    return await FieldData.findAll({
      where: { id: fields },
      attributes: ['field_id'],
      raw: true,
    });
  }

  async postErrorFields(
    fields: number[],
    comments: any[],
    fields_assign: number[],
    work_order_id: number,
    assigned_to: number,
    time_interval: number,
    error_count: number,
  ): Promise<any> {
    await this.distributeWorkOrderModel.update(
      { status: 'authorized' },
      { where: { work_order_id: work_order_id, assigned_to: assigned_to } },
    );
    if (fields.length > 0) {
      const temp = await this.employeeService.AuthorTeamId(assigned_to);
      const load_list = [];

      for (let i = 0; i < temp.length; i++) {
        const load = await this.getEmployeeWorkLoad(temp[i]);
        load_list[i] = load.length;
      }
      const least_work_load = temp[load_list.indexOf(Math.min(...load_list))];

      for (let i = 0; i < fields_assign.length; i++) {
        let field_assigned_to = await this.fieldDataModel.findOne({
          where: { id: fields_assign[i] },
          attributes: ['assigned_to'],
          raw: true,
        });
        let employee_with_error = field_assigned_to.assigned_to;
        const fieldId = fields_assign[i];
        const comment = comments[i] || '';

        try {
          const updatedField = await this.fieldDataModel.update(
            {
              status: null,
              err_type: 'Error',
              prev_assigned: sequelize.fn(
                'array_append',
                sequelize.col('prev_assigned'),
                employee_with_error,
              ),
              err_comment: comment,
              assigned_to: least_work_load,
            },
            { where: { id: fieldId, work_order_id } },
          );
        } catch (error) {
          console.error('Error updating field:', error);
        }
      }
      const all_fields = await this.fieldDataModel.findAll({
        where: { work_order_id },
        attributes: ['field_id'],
        raw: true,
      });
      const all_fields_array = all_fields.map((field) => field.field_id);

      const filtered_array = all_fields_array.filter(
        (item) => !fields.includes(item),
      );

      await this.fieldDataModel.update(
        { status: 'checked' },
        { where: { field_id: filtered_array, work_order_id } },
      );

      for (let i = 0; i < fields_assign.length; i++) {
        let field = [fields_assign[i]];
        await this.createNewAuthorOrder(
          work_order_id,
          field,
          temp[load_list.indexOf(Math.min(...load_list))],
          8,
        );
      }

      await this.postEmployeeStatsforReadWrite(
        work_order_id,
        time_interval,
        error_count,
        assigned_to,
        fields_assign,
      );
    } else {
      //all fields will be checked
      await this.fieldDataModel.update(
        { status: 'checked' },
        { where: { work_order_id } },
      );
    }
  }

  async postEmployeeStats(
    work_order_id: number,
    time_interval: number,
    error_count: number,
    employee_id: number,
  ) {
    const prev_employee = await Employee.findOne({
      where: { id: employee_id },
      attributes: ['team_id', 'role_id'],
      raw: true,
    });
    const time = await this.distributeWorkOrderModel.findOne({
      where: { work_order_id: work_order_id, assigned_to: employee_id },
      attributes: ['estimated_time', 'createdAt'],
      raw: true,
    });

    const target_time = time.estimated_time;
    const time_allotted_ms = Date.now() - new Date(time.createdAt).getTime(); // Calculate the time difference in milliseconds
    const time_allotted = Math.floor(time_allotted_ms / (1000 * 60)); // Convert milliseconds to minutes

    await EmployeeStats.create({
      work_order_id,
      target_time,
      time_interval,
      time_allotted: time_allotted, // Convert time_allotted to string
      error_count: error_count, // Convert error_count to string
      employee_id,
      team_id: Number(prev_employee.team_id),
      role_id: Number(prev_employee.role_id),
    });
  }

  async incrementErrorCount(list: number[]) {
    for (const field_id of list) {
      const field_values = await FieldData.findOne({
        where: { id: field_id },
        attributes: ['work_order_id', 'prev_assigned'],
        raw: true,
      });

      const work_order_id = field_values.work_order_id;
      const employee_id = field_values.prev_assigned[0];

      // Find the existing EmployeeStats record for the given work_order_id and employee_id
      const employeeStats = await EmployeeStats.findOne({
        where: { work_order_id, employee_id },
      });

      // If a record exists, increment the error_count

      if (employeeStats) {
        await employeeStats.increment('error_count');
      }
    }
  }

  async postEmployeeStatsforReadWrite(
    work_order_id: number,
    time_interval: number,
    error_count: number,
    employee_id: number,
    list: number[],
  ) {
    const prev_employee = await Employee.findOne({
      where: { id: employee_id },
      attributes: ['team_id', 'role_id'],
      raw: true,
    });
    const time = await this.distributeWorkOrderModel.findOne({
      where: { work_order_id: work_order_id, assigned_to: employee_id },
      attributes: ['estimated_time', 'createdAt'],
      raw: true,
    });

    const target_time = time.estimated_time;
    const time_allotted_ms = Date.now() - new Date(time.createdAt).getTime(); // Calculate the time difference in milliseconds
    const time_allotted = Math.floor(time_allotted_ms / (1000 * 60)); // Convert milliseconds to minutes

    await EmployeeStats.create({
      work_order_id,
      target_time,
      time_interval,
      time_allotted: time_allotted, // Convert time_allotted to string
      error_count: error_count, // Convert error_count to string
      employee_id,
      team_id: Number(prev_employee.team_id),
      role_id: Number(prev_employee.role_id),
    });

    await this.incrementErrorCount(list);
  }
  async findWorkStatusByMonth(month: string = '2024-04') {
    try {
      // console.log('Month:', month);

      const startOfMonth = new Date(month);
      const endOfMonth = new Date(
        startOfMonth.getFullYear(),
        startOfMonth.getMonth() + 1,
        0,
      );

      const totatlWorkOrders = await DistributeWorkOrder.count({
        where: {
          createdAt: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
      });
      const workOrdersChecked = await DistributeWorkOrder.count({
        where: {
          createdAt: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
          status: {
            [Op.not]: null,
          },
        },
      });

      const workOrdersNotChecked = await DistributeWorkOrder.count({
        where: {
          createdAt: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
          status: null,
        },
      });

      return {
        totatlWorkOrders: totatlWorkOrders,
        workOrdersChecked: workOrdersChecked,
        workOrdersNotChecked: workOrdersNotChecked,
      };
    } catch (error) {
      console.error('Error finding work status by month:', error);
      throw error;
    }
  }
}
