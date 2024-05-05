import { Injectable, Inject } from '@nestjs/common';
import { Workflow } from './workflow.model';

@Injectable()
export class WorkflowService {
  constructor(
    @Inject('WORKFLOW_REPOSITORY') private workflowRepository: typeof Workflow,
  ) {}

  async createWorkflow(createWorkflowDto: any): Promise<Workflow> {
    return this.workflowRepository.create<Workflow>(createWorkflowDto);
  }

  async findAllWorkflow(): Promise<Workflow[]> {
    return this.workflowRepository.findAll<Workflow>();
  }

  async findOneWorkflow(id: number): Promise<Workflow> {
    return this.workflowRepository.findOne<Workflow>({ where: { id } });
  }

  async updateWorkflow(id: number, updateData: Partial<Workflow>): Promise<void> {
    await this.workflowRepository.update(updateData, { where: { id } });
  }

  async deleteWorkflow(id: number): Promise<any> {
    await this.workflowRepository.destroy({ where: { id } });
    return { message: 'deleted' };
  }

  async findAllByAccess(access: string): Promise<Workflow[]> {
    const workflows = await this.workflowRepository.findAll({
      where: { access },
    });
    return workflows;
  }
}