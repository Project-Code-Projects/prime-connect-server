import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { Workflow } from './workflow.model';
import { RoleService } from '../role/role.service';

@Controller('/workflow')
export class WorkflowController {
  constructor(private workflowService: WorkflowService, private roleService: RoleService) {}

  @Post()
  async create(@Body() createWorkflowDto: any) {
    const { sequence,team_id, role_id, access, isAuthor } = createWorkflowDto;
    const role = await this.roleService.findOne(role_id);
    const workflow = this.workflowService.createWorkflow(createWorkflowDto);
    return { name: (await role).name, description: (await role).description, access: (await workflow).access, isAuthor: (await workflow).isAuthor, sequence: (await workflow).sequence, id: (await workflow).id};
  }

  @Get()
  async findAll(): Promise<Workflow[]> {
    return this.workflowService.findAllWorkflow();
  }

  @Get('role_id/:role_id')

  async findByRoleId(@Param('role_id') role_id: number): Promise<Workflow | null> {
    return await this.workflowService.findAllByRoleId(role_id);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Workflow> {
    return this.workflowService.findOneWorkflow(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateWorkflowDto: Workflow) {
    return this.workflowService.updateWorkflow(id, updateWorkflowDto);
  }

  @Delete('/:team_id/:role_id')
  async delete(@Param('team_id') team_id: number, @Param('role_id') role_id: number) {
    return this.workflowService.deleteWorkflow(team_id,role_id);
  }

  @Get('access/:access')
  async findAllByAccess(@Param('access') access: string): Promise<Workflow[]> {
    return this.workflowService.findAllByAccess(access);
  }
}