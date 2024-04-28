import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { DistributeWorkOrderService } from './distribute-work-order.service';
import { IDistributeWorkOrder } from './distribute-work-order.interface';
import { EmployeeRoleService } from 'src/employee-role/employee-role.service';
import { IEmployeeRole } from 'src/employee-role/employee-role.interface';
import { FieldTableService } from 'src/field-table/field-table.service';

@Controller('distribute-work-order')
export class DistributeWorkOrderController {
  constructor(
    private readonly distributeWorkOrderService: DistributeWorkOrderService,
    private readonly employeeService: EmployeeRoleService,
    private readonly fieldTableService: FieldTableService,
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
}
