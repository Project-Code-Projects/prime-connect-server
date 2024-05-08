import { Module } from '@nestjs/common';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';
import { workflowProvider } from './workflow.provider';
import { RoleService } from '../role/role.service';
import { roleProvider } from '../role/role.provider';

@Module({
  controllers: [WorkflowController],
  providers: [WorkflowService, workflowProvider, RoleService, roleProvider],
  exports: [WorkflowService],
})

export class WorkflowModule { }