import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeRoleService } from './employee-role.service';
import { EmployeeRole } from './employee-role.model';
import { IEmployeeRole } from './employee-role.interface';
import { log } from 'console';

@Controller('employee-roles')
export class EmployeeRoleController {
  constructor(private readonly employeeRoleService: EmployeeRoleService) {}
  @Get()
  async getRoleName(@Body() requestBody: { id: number }): Promise<string> {
    console.log(requestBody.id);

    const result = await this.employeeRoleService.getRoleName(requestBody.id);
    return result;
  }
}
