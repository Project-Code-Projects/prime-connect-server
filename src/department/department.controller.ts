import { Controller, Post, Get, Put, Delete, Body,Param } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { IDepartment } from './department.interface';

@Controller('/department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() createDepartmentDto: IDepartment) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get()
  async findAll() {
    return this.departmentService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return this.departmentService.findOne(id);
  }

  @Get('/:id/employee')
  async finEmployeeByDeptId(@Param('id') id: number) {
    return this.departmentService.findEmployeeByDeptId(id);
  }
 
  @Delete('/:id')
  async deleteDepartment(@Param('id') id: string): Promise<void> {
    await this.departmentService.deleteDepartment(id);
  }

  @Put('/:id')
  async updateDepartment( @Param('id') id: string, @Body() updateData: Partial<IDepartment>, ): Promise<void> {
    await this.departmentService.updateDepartment(id, updateData);
  }
}