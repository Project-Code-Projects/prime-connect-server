import { Controller, Post, Get, Put, Delete, Body,Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { Employee } from '../employee/employee.model';
import { EmployeeService } from '../employee/employee.service';
import { TeamRoleService } from '../team_role/team_role.service';

@Controller('/role')
export class RoleController {
  constructor(private readonly roleService: RoleService, private employeeService: EmployeeService, private teamRoleService: TeamRoleService) {}

  @Post()
  async create(@Body() createRoleDto: any) {
    const { team_id,access,isAuthor,sequence } = createRoleDto;
    const newRole = await this.roleService.createRole(createRoleDto);
    const { id,name,description } = newRole;
    const teamRole = await this.teamRoleService.createTeamRole({ team_id, role_id: id, access, isAuthor, sequence });
    return { id,name,description,TeamRole: teamRole};
  }

  @Get()
  async findAllRole() {
    return this.roleService.findAllRole();
  }

  @Put('/:id')
  async updateRole( @Param('id') id: string, @Body() updateData: Partial<any>, ): Promise<void> {
    await this.roleService.updateRole(id, updateData);
  }

  @Delete('/:id/:team_id')
  async deleteRole(@Param('id') id: number, @Param('team_id') team_id: number): Promise<void> {
   await this.teamRoleService.deleteTeamRole(team_id,id);
  }
}