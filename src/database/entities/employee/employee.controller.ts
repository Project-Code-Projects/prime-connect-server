import { Controller, Post, Get, Put, Delete, Body,Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('/employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async createEmployee(@Body() createEmployeeDto: any) {
    return this.employeeService.createEmployee(createEmployeeDto);
  }

  @Get()
  async findAllEmployee() {
    return this.employeeService.findAllEmployee();
  }

  @Put('/:id')
  async updateEmployeeInfo( @Param('id') id: string, @Body() updateData: Partial<any>, ): Promise<void> {
    await this.employeeService.updateEmployeeInfo(id, updateData);
  }

  @Delete('/:id')
  async deleteEmployee(@Param('id') id: string): Promise<void> {
    await this.employeeService.deleteEmployee(id);
  }
}