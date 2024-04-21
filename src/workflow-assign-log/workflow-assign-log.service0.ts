// import { Injectable, Inject, Logger } from '@nestjs/common';
// import { WorkFlowAssignLog } from './workflow-assign-log.model';
// import { WorkOrderService } from '../work-order/work-order.service';
// import { WorkOrder } from '../work-order/work-order.model';
// import { Employee } from '../employee/employee.model';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { EmployeeRole } from '../employee-role/employee-role.model';
// import { Op } from 'sequelize';

// @Injectable()
// export class WorkFlowAssignLogService {
//   private readonly logger = new Logger(WorkFlowAssignLogService.name);
//   private readonly threshold = 3;

//   constructor(
//     @Inject('WORKFLOW_ASSIGN_LOG_REPOSITORY')
//     private readonly workFlowAssignLogModel: typeof WorkFlowAssignLog,
//     @Inject('WORKORDER_REPOSITORY')
//     private readonly workOrderModel: typeof WorkOrder,
//     @Inject('EMPLOYEE_REPOSITORY')
//     private readonly employeeModel: typeof Employee,
//     @Inject('EMPLOYEE_ROLE_REPOSITORY')
//     private readonly employeeRoleModel: typeof EmployeeRole,
//   ) {}

//   async assignTask(
//     workOrder_id: number,
//     role_id: number,
//     employee_id: number,
//     step_id: number,
//   ): Promise<void> {
//     try {
//       await this.workFlowAssignLogModel.create({
//         work_order_id: workOrder_id,
//         role_id: role_id,
//         employee_id: employee_id,
//         step_id: step_id,
//       });
//       console.log(`Task ${workOrder_id} assigned to ${employee_id}`);
//     } catch (error) {
//       console.log(
//         `Error assigning task ${workOrder_id} to ${employee_id}:`,
//         error,
//       );
//     }
//   }

//   async updateWorkOrder(
//     id: number,
//     status: string,
//     assignedTo: number,
//   ): Promise<void> {
//     try {
//       await this.workOrderModel.update(
//         {
//           status: status,
//           assigned_to: assignedTo,
//           start_time: new Date(),
//           isAssigned: true,
//         },
//         { where: { id } },
//       );
//       console.log(
//         `Work order updated for task ${id} with assigned_to ${assignedTo}`,
//       );
//     } catch (error) {
//       console.log(`Error updating work order for task ${id}:`, error);
//     }
//   }

//   async distributeTask(): Promise<void> {
//     try {
//       const activeEmployees = await this.employeeModel.findAll({
//         where: { active: true, admin: false },
//         include: [
//           { model: EmployeeRole, where: { id: { [Op.in]: [2, 3, 4] } } },
//         ],
//       });

//       await Promise.all(
//         activeEmployees.map(async (employee) => {
//           const tasks = await this.workOrderModel.findAll({
//             where: {
//               status: employee.employee_role.name,
//               isAssigned: false,
//             },
//             limit: this.threshold,
//           });

//           await Promise.all(
//             tasks.map(async (task) => {
//               await this.assignTask(
//                 task.id,
//                 task.employee_role.id,
//                 employee.id,
//                 1,
//               );
//               await this.updateWorkOrder(
//                 task.id,
//                 task.employee_role.name,
//                 employee.id,
//               );
//             }),
//           );
//         }),
//       );

//       console.log('Tasks distributed successfully.');
//     } catch (error) {
//       console.error('Error distributing tasks:', error);
//     }
//   }

//   @Cron(CronExpression.EVERY_MINUTE, { name: 'distributeTask' })
//   distributeTaskByCron() {
//     this.logger.debug('Running distributeTask cron job...');
//     return this.distributeTask();
//   }
// }
// async findAll(): Promise<any[]> {
//   // Fetch all records with necessary associations
//   const result = await this.workFlowAssignLogModel.findAll({
//     include: [
//       {
//         model: WorkOrder,
//         attributes: ['acc_id', 'acc_type'],
//         as: 'workOrder',
//       },
//       {
//         model: Employee,
//         attributes: ['name'],
//         as: 'employee',
//       },
//       {
//         model: EmployeeRole,
//         attributes: ['name'],
//         as: 'role',
//       },
//     ],
//   });

//   // Group records by acc_id
//   const groupedData: { [key: number]: any } = {};
//   result.forEach((log) => {
//     const accId = log.workOrder.acc_id;
//     if (!groupedData[accId]) {
//       groupedData[accId] = {
//         acc_id: accId,
//         acc_type: log.workOrder.acc_type,
//         Reviewer: null,
//         Maker: null,
//         Checker: null,
//       };
//     }
//     if (log.role.name === 'reviewer') {
//       groupedData[accId].Reviewer = log.employee.name;
//     } else if (log.role.name === 'maker') {
//       groupedData[accId].Maker = log.employee.name;
//     } else if (log.role.name === 'checker') {
//       groupedData[accId].Checker = log.employee.name;
//     }
//   });

//   // Convert grouped data to array
//   const formattedResult = Object.values(groupedData);

//   return formattedResult;
// }
