import { EmployeeStatsModule } from './../employee_stats/employee_stats.module';
import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { DistributeWorkOrderService } from './distribute-work-order.service';
import { IDistributeWorkOrder } from './distribute-work-order.interface';
import { EmployeeRoleService } from 'src/employee-role/employee-role.service';
import { IEmployeeRole } from 'src/employee-role/employee-role.interface';
import { FieldTableService } from 'src/field-table/field-table.service';
import { EmployeeService } from 'src/employee/employee.service';
import { WorkflowService } from '../workflow/workflow.service';

@Controller('distribute-work-order')
export class DistributeWorkOrderController {
  constructor(
    private readonly distributeWorkOrderService: DistributeWorkOrderService,
    private readonly employeeService: EmployeeRoleService,
    private readonly fieldTableService: FieldTableService,
    private readonly employeService: EmployeeService,
    private readonly workflowService: WorkflowService
  ) {}
  @Post('assign-task')
  async assignTask(): Promise<any> {
    return this.distributeWorkOrderService.distributeTask();
  }

  @Get()
  async findAllWorkOrder(): Promise<IDistributeWorkOrder[]> {
    return this.distributeWorkOrderService.findAllWorkOrder();
  }

  @Post()
  async updateFieldData(): Promise<void> {
    return await this.distributeWorkOrderService.updateAllFieldData();
  }

  @Get('employee/:id') // Define the route including the employee ID

  async getTasksByEmployeeId(@Param('id') id: number): Promise<any> {
    try {
      const employee = await this.employeService.findOne(id);
      console.log('employee test',employee);	
      const workflow = await this.workflowService.findOneByTeamRoleId(employee.team_id, employee.role_id);
      console.log('workflow test',workflow);	
     if(workflow) return await this.distributeWorkOrderService.findDistributedWorksByEmployeeId(
        id,workflow.access
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }  // Define the parameter to be passed in the route

  @Get('employee/:employeeId/:orderId') // Define the route including the employee ID
  async getTasksByEmployee(
    @Param('employeeId') employeeId: number,
    @Param('orderId') orderId: number
  ): Promise<IDistributeWorkOrder[]> {
    try {
      return await this.distributeWorkOrderService.findDistributedTasksByEmployeeId(
        employeeId, orderId
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Put('approve')
  async approveWorkOrder(@Body() requestBody: { work_order_id: number, assigned_to: number }): Promise<any> {
    try {
      const { work_order_id, assigned_to } = requestBody;
      return await this.distributeWorkOrderService.approveWorkOrder(work_order_id, assigned_to);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('check/:work_order_id')
  async CheckStatus(@Param('work_order_id') work_order_id: number ): Promise<any> {
    try {
      
      return await this.distributeWorkOrderService.checkApproved(work_order_id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  @Get('fields/:work_order_id')
  async getFields(@Param('work_order_id') work_order_id: number ): Promise<any> {
    try {
      
      return await this.distributeWorkOrderService.getFields(work_order_id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  @Get('sum/:work_order_id')
  async sumOfFields(@Param('work_order_id') work_order_id: number ): Promise<any> {
    try {
      
      return await this.distributeWorkOrderService.sumOfFields(work_order_id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  @Post('assign/author')
  async assignAuthor(@Body() requestBody: { work_order_id: number, field_id: number[], assigned_to: number, estimated_time: number}): Promise<any> {
    return await this.distributeWorkOrderService.createNewAuthorOrder(requestBody.work_order_id, requestBody.field_id, requestBody.assigned_to, requestBody.estimated_time);
  }

  @Get('author/:work_order_id/:assigned_to')

  async fieldsForReadWrite(@Param('work_order_id') work_order_id: number, @Param('assigned_to') assigned_to: number): Promise<any> {
    const field_ref = await this.distributeWorkOrderService.fieldsForReadWrite(work_order_id, assigned_to);

    return field_ref
  }

  @Put('post-error-fields') // Define the route for this method
  async postErrorFields(@Body() requestBody: { fields: any[], comments: any[] , fields_assigned: number[], work_order_id: number, assigned_to: number, time_interval: number, error_count: number}): Promise<any> {
    const { fields, comments, fields_assigned, work_order_id , assigned_to, time_interval, error_count} = requestBody;
    return this.distributeWorkOrderService.postErrorFields(fields, comments, fields_assigned, work_order_id, assigned_to, time_interval, error_count);
  }


  @Post('employee_stats')
  async postEmployeeStats(@Body() employeeStats: any): Promise<any> {
    const { work_order_id, time_interval, error_count, employee_id } = employeeStats;
    return await this.distributeWorkOrderService.postEmployeeStats(work_order_id, time_interval, error_count, employee_id);
  }
  @Post('author_employee_stats')
  async postAuthorEmployeeStats(@Body() employeeStats: any): Promise<any> {
    console.log('hi')
    const { work_order_id, time_interval, error_count, employee_id, list } = employeeStats;
    return await this.distributeWorkOrderService.postEmployeeStatsforReadWrite(work_order_id, time_interval, error_count, employee_id, list);
  }




}

  

