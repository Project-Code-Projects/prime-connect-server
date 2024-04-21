import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { IEmployee } from './employee.interface';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Get()
  async getActiveEmployee(): Promise<Employee[]> {
    return this.employeeService.findActiveEmployee();
  }
}
