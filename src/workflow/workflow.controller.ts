import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { Workflow } from './workflow.model';

@Controller('/workflow')
export class WorkflowController {
  constructor(private workflowService: WorkflowService) {}

  @Post()
  async create(@Body() createWorkflowDto: Workflow) {
    return this.workflowService.createWorkflow(createWorkflowDto);
  }

  @Get()
  async findAll(): Promise<Workflow[]> {
    return this.workflowService.findAllWorkflow();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Workflow> {
    return this.workflowService.findOneWorkflow(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateWorkflowDto: Workflow) {
    return this.workflowService.updateWorkflow(id, updateWorkflowDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.workflowService.deleteWorkflow(id);
  }

  @Get('access/:access')
  async findAllByAccess(@Param('access') access: string): Promise<Workflow[]> {
    return this.workflowService.findAllByAccess(access);
  }
}