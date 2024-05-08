import { Controller, Post, Get, Put, Delete, Body,Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { Employee } from '../employee/employee.model';
import { EmployeeService } from '../employee/employee.service';
import { TeamRoleService } from '../team_role_workflow/team_role_workflow.service';
import { TeamRole } from '../team_role_workflow/team_role_workflow.model';
import { WorkflowService } from '../workflow/workflow.service';

@Controller('/role')
export class RoleController {
  constructor(private readonly workflowService: WorkflowService,private readonly roleService: RoleService, private employeeService: EmployeeService, private teamRoleService: TeamRoleService) {}

  @Post()
  async create(@Body() createRoleDto: any) {
    const { name,description,team_id,access,isAuthor,sequence } = createRoleDto;
    const newRole = await this.roleService.createRole({name,description});
    const { id } = newRole;
    const workflow = await this.workflowService.createWorkflow({ sequence,team_id, role_id: id, access, isAuthor });
    const teamRole = await this.teamRoleService.createTeamRole({ team_id, role_id: id});
    return { id,name,description,TeamRole: teamRole};
  }

  @Get()
  async findAllRole() {
    return this.roleService.findAllRole();
  }

  @Get('/:id')
  async findOneRole(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }
  
  @Get('/workflow/:role_id')
  async findWorkflow(@Param('role_id') role_id: number) {
    return this.teamRoleService.findAllByRoleId(role_id);
  }

  @Get('/workflow/:role_id/:team_id')
  async findOneWorkflow(@Param('role_id') role_id: number, @Param('team_id') team_id: number): Promise<TeamRole[]> {
   return this.teamRoleService.findOneTeamRole(team_id,role_id);
  }

  @Put('/:id')
  async updateRole( @Param('id') id: string, @Body() updateData: Partial<any>, ): Promise<void> {
    await this.roleService.updateRole(id, updateData);
    // await this.teamRoleService.updateTeamRole(id,updateData);
  }

  @Delete('/:id')
  async deleteRole(@Param('id') id: number): Promise<void> {
    await this.roleService.deleteRole(id);
  }

  @Delete('/:id/:team_id')
  async deleteWorkflow(@Param('id') id: number, @Param('team_id') team_id: number): Promise<void> {
   await this.teamRoleService.deleteTeamRole(team_id,id);
  }
}