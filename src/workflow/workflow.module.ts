import { Module } from '@nestjs/common';
import { WorkflowController } from './workflow.controller';
import { WorkflowService } from './workflow.service';
import { workflowProvider } from './workflow.provider';

@Module({
  controllers: [WorkflowController],
  providers: [WorkflowService, workflowProvider],
  exports: [WorkflowService],
})

export class WorkflowModule { }