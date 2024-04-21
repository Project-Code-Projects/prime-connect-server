import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MainWorkOrderService } from './main-work-order.service';
import { IMainWorkOrder } from './main-work-order.interface';
import { EmployeeRoleService } from 'src/employee-role/employee-role.service';
import { IEmployeeRole } from 'src/employee-role/employee-role.interface';

@Controller('main-work-order')
export class MainWorkOrderController {
  constructor(
    private readonly workOrderService: MainWorkOrderService,
    private readonly employeeService: EmployeeRoleService,
  ) {}
}
