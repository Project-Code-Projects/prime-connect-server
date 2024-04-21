import { Controller, Post, Get, Put, Delete, Body,Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { employee } from '../employee/employee.model';
import { EmployeeService } from '../employee/employee.service';

@Controller('/role')
export class RoleController {
  constructor(private readonly roleService: RoleService, private employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createRoleDto: any) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  async findAllRole() {
    return this.roleService.findAllRole();
  }
  @Get('/team/:id')
  async findAllRoleByTeamId(@Param('id') id: number) {
    const roles = this.roleService.findAllRoleByTeamId(id);
    let employees: employee[] = [];

    const roleId: number[] = (await roles).map(role => role.id);
    const roleName: string[] = (await roles).map(role => role.name);

    employees = await this.employeeService.findAllEmployeeByRoleId(roleId);

    return { roleId,roleName, employees };
  }

  @Put('/:id')
  async updateRole( @Param('id') id: string, @Body() updateData: Partial<any>, ): Promise<void> {
    await this.roleService.updateRole(id, updateData);
  }

  @Delete('/:id')
  async deleteRole(@Param('id') id: string): Promise<void> {
    await this.roleService.deleteRole(id);
  }
}