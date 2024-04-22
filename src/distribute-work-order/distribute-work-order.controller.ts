import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { DistributeWorkOrderService } from './distribute-work-order.service';
import { IDistributeWorkOrder } from './distribute-work-order.interface';
import { EmployeeRoleService } from 'src/employee-role/employee-role.service';
import { IEmployeeRole } from 'src/employee-role/employee-role.interface';

@Controller('main-work-order')
export class DistributeWorkOrderController {
  constructor(
    private readonly distributeWorkOrderService: DistributeWorkOrderService,
    private readonly employeeService: EmployeeRoleService,
  ) {}
}
